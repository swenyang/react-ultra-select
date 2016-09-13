import React, { Component, PropTypes } from 'react'
import IScroll from 'iscroll-react'
import iScroll from 'iscroll/build/iscroll-probe'
import equal from 'deep-equal'
import MyPortal from './Portal'

import './UltraSelect.less'

const positiveOddPropType = (props, propName, componentName) => {
    const val = props[propName]
    if (typeof val === 'number' && val > 0 && val % 2 !== 0) {
        return null
    }
    return new Error(`${componentName}: ${propName} should be passed a positive odd number.`)
}

const pushEmptyElements = (props) => {
    const selected = []
    const numEmpty = Math.floor(props.rowsVisible / 2)
    const columns = []
    for (let i = 0, l = props.columns.length; i < l; i++) {
        // push several empty elements before & after for each column
        let newList = []
        for (let j = 0; j < numEmpty; j++) {
            newList.push({
                key: '',
                value: '',
            })
        }
        newList = newList.concat(props.columns[i].list)
        for (let j = 0; j < numEmpty; j++) {
            newList.push({
                key: '',
                value: '',
            })
        }

        // calculate selected index
        let index = props.columns[i].defaultIndex || 0
        index += numEmpty
        const max = newList.length - Math.ceil(props.rowsVisible / 2)
        if (index < numEmpty) index = numEmpty
        if (index > max) index = max
        columns.push({
            list: newList,
        })
        selected.push(index)
    }
    return [selected, columns]
}

export default class UltraSelect extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            list: PropTypes.arrayOf(PropTypes.shape({
                key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                value: PropTypes.node.isRequired,
            })).isRequired,
            defaultIndex: PropTypes.number,
        })).isRequired,

        // displaying
        rowsVisible: positiveOddPropType,
        rowHeight: PropTypes.number,
        rowHeightUnit: PropTypes.string,
        titleHeight: PropTypes.number,
        titleHeightUnit: PropTypes.string,

        backdrop: PropTypes.bool,
        backdropAction: PropTypes.oneOf(['confirm', 'cancel', 'none']),
        getTitle: PropTypes.func,
        getStaticText: PropTypes.func,
        confirmButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        cancelButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        isOpen: PropTypes.bool,
        useTouchTap: PropTypes.bool,

        disabled: PropTypes.bool,

        // events
        onOpen: PropTypes.func,     // open selection panel
        onClose: PropTypes.func,    // close selection panel
        onConfirm: PropTypes.func,  // click confirm button or click backdrop
        onCancel: PropTypes.func,   // click cancel button
        // scroll up and down to select elements while select panel is open, good time for such as playing sound effects
        onSelect: PropTypes.func,
        // stop scrolling up and down while select panel is open, useful for real-time selection
        onDidSelect: PropTypes.func,
    }

    static defaultProps = {
        rowsVisible: 7,
        rowHeight: 25,
        rowHeightUnit: 'px',
        titleHeightUnit: 'px',
        backdrop: true,
        confirmButton: 'Confirm',
        cancelButton: 'Cancel',
        disabled: false,
        useTouchTap: false,
        backdropAction: 'confirm',
    }

    constructor(props) {
        const [selected, columns] = pushEmptyElements(props)

        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onToggle = this.onToggle.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onConfirm = this.onConfirm.bind(this)
        this.onTouchBackdrop = this.onTouchBackdrop.bind(this)

        const selectedValues = this.getSelectedValues(columns, selected)
        this.state = {
            selected,
            title: this.getTitle(selectedValues),
            staticText: this.getStaticText(selectedValues),
            open: this.props.isOpen,
            columns,
        }
        if (this.props.isOpen) {
            this.setBodyOverflow(true)
        }
    }

    componentDidMount() {
        // incase mount with isOpen=true
        this.scrollToSelected()
    }

    componentWillReceiveProps(nextProps) {
        const [selected, columns] = pushEmptyElements(nextProps)
        const selectedValues = this.getSelectedValues(columns, selected)
        const newState = {
            ...this.state,
            selected,
            title: this.getTitle(selectedValues),
            // staticText: this.getStaticText(selectedValues),
            columns,
            open: nextProps.isOpen == null ? this.state.open : nextProps.isOpen,
        }
        if (newState.open) {
            this.mSelectedOnOpen = selected
        }
        else {
            newState.staticText = this.getStaticText(selectedValues)
        }
        this.setState(newState)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Object.keys(this.props).length !== Object.keys(nextProps).length) {
            return true
        }
        for (const key of Object.keys(nextProps)) {
            if (key === 'columns') {
                if (!equal(nextProps.columns, this.props.columns)) {
                    return true
                }
            }
            else if (!key.startsWith('on') && nextProps[key] !== this.props[key]) {
                return true
            }
        }
        // console.log('equal props')

        if (Object.keys(this.state).length !== Object.keys(nextState).length) {
            return true
        }
        for (const key of Object.keys(nextState)) {
            if (key === 'title' || key === 'staticText') {
                // ignore title/staticText because they are changed by columns & selected
            }
            else if (key === 'selected' || key === 'columns') {
                if (!equal(nextState[key], this.state[key])) {
                    return true
                }
            }
            else if (nextState[key] !== this.state[key]) {
                return true
            }
        }
        // console.log('no need to update')
        return false
    }

    componentDidUpdate() {
        // use setTimeout(func, 0) to fix async data bugs
        setTimeout(() => {
            for (let i = 0, l = this.state.columns.length; i < l; i++) {
                const iscroll = this.refs[`column${i}`]
                if (iscroll) {
                    iscroll.updateIScroll()
                }
            }
            this.scrollToSelected()
        }, 0)
    }

    onScrollEnd(instance) {
        const index = this.findColumnIndex(instance)
        const { elem } = this.refs
        if (elem) {
            if (this.mSelectedNew) {
                this.mSelectedNew = false
                const selectedValues = this.getSelectedValues(this.state.columns, this.state.selected)
                if (this.props.onDidSelect) {
                    this.props.onDidSelect(index, selectedValues[index])
                }
            }

            // incase instance bounce back on top/bottom
            if (instance.y >= 0) return
            const maxOffset = (this.props.rowsVisible * elem.clientHeight) - instance.scrollerHeight
            if (instance.y <= maxOffset) return

            instance.scrollTo(0, -(this.state.selected[index] - Math.floor(this.props.rowsVisible / 2)) * elem.clientHeight, 0)
        }
    }

    onScroll(instance) {
        // console.log(instance.y)
        const index = this.findColumnIndex(instance)
        if (index === -1) return
        const { elem } = this.refs
        if (elem) {
            const selectedOld = this.state.selected[index]
            const selectedNew = this.calculateSelected(instance.y, this.state.columns[index].list.length, this.props.rowsVisible, elem.clientHeight, instance.scrollerHeight)
            if (selectedOld !== selectedNew) {
                // console.log("select new index", selectedNew, selectedOld)
                const selected = [...this.state.selected]
                selected[index] = selectedNew
                const selectedValues = this.getSelectedValues(this.state.columns, selected)
                this.setState({
                    ...this.state,
                    selected,
                    title: this.getTitle(selectedValues),
                    //staticText: this.getStaticText(selectedValues),
                })
                this.mSelectedNew = true
                if (this.props.onSelect) {
                    this.props.onSelect(index, selectedValues[index])
                }
            }
        }
    }

    onToggle(isCancel = false) {
        if (!this.state.open && this.props.disabled) {
            return
        }
        if (!this.state.open) {
            if (this.props.backdrop) {
                this.setBodyOverflow(true)
            }
            if (this.props.onOpen) {
                this.props.onOpen(this.selectedValues)
            }
            this.mSelectedOnOpen = this.state.selected
            this.setState({
                ...this.state,
                open: true,
            })
        }
        else {
            if (this.props.backdrop) {
                this.setBodyOverflow(false)
            }
            if (this.props.onClose) {
                this.props.onClose(this.selectedValues)
            }
            if (isCancel === true) {
                // if cancel selection, revert state
                const selectedValues = this.getSelectedValues(this.state.columns, this.mSelectedOnOpen)
                this.setState({
                    ...this.state,
                    open: false,
                    selected: this.mSelectedOnOpen,
                    title: this.getTitle(selectedValues),
                    staticText: this.getStaticText(selectedValues),
                })
            }
            else {
                // if confirm selection, update static text
                const selectedValues = this.getSelectedValues(this.state.columns, this.state.selected)
                this.setState({
                    ...this.state,
                    open: !this.state.open,
                    title: this.getTitle(selectedValues),
                    staticText: this.getStaticText(selectedValues),
                })
            }
        }
    }

    onTouchBackdrop() {
        switch (this.props.backdropAction) {
        case 'confirm':
            this.onConfirm()
            break
        case 'cancel':
            this.onCancel()
            break
        default:
            break
        }
    }

    onConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.selectedValues)
        }
        setTimeout(() => this.onToggle(), 0)
    }

    onCancel() {
        if (this.props.onCancel) {
            this.props.onCancel(this.selectedValues)
        }
        setTimeout(() => this.onToggle(true), 0)
    }

    getSelectedValues(columns, selected) {
        const ret = []
        for (let i = 0, l = columns.length; i < l; i++) {
            ret.push(columns[i].list[selected[i]])
        }
        return ret
    }

    getTitle(selectedValues) {
        if (this.props.getTitle) {
            return this.props.getTitle(selectedValues)
        }
        return null
        // return this.concatArrStrings(selectedValues)
    }

    getStaticText(selectedValues) {
        if (this.props.getStaticText) {
            return this.props.getStaticText(selectedValues)
        }
        return this.concatArrStrings(selectedValues)
    }

    getElemClass(elemIndex, columnIndex) {
        const distance = Math.abs(elemIndex - this.state.selected[columnIndex])
        switch (distance) {
        case 0: return 'elem-level-1'
        case 1: return 'elem-level-2'
        case 2: return 'elem-level-3'
        default:
            return 'elem-level-4'
        }
    }

    setBodyOverflow(isStore) {
        /* global document */
        if (isStore) {
            this.mPrevBodyOverflow = document.body.style.overflow
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = this.mPrevBodyOverflow
            this.mPrevBodyOverflow = null
        }
    }

    calculateSelected(offset, numCells, visibleCells, cellHeight, totalHeight) {
        const start = Math.floor(visibleCells / 2)
        const end = numCells - Math.ceil(visibleCells / 2)

        if (offset >= 0) return start
        const maxOffset = (visibleCells * cellHeight) - totalHeight
        if (offset <= maxOffset) return end

        return start + Math.round(Math.abs(offset) / cellHeight)
    }

    findColumnIndex(instance) {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            const column = this.refs[`column${i}`]
            if (column && column.iScrollInstance === instance) {
                return i
            }
        }
        return -1
    }

    get selectedValues() {
        return this.getSelectedValues(this.state.columns, this.state.selected)
    }

    scrollToSelected() {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            const { elem } = this.refs
            if (!elem) return
            this.refs[`column${i}`].iScrollInstance.scrollTo(0, -(this.state.selected[i] - Math.floor(this.props.rowsVisible / 2)) * elem.clientHeight, 0)
        }
    }

    concatArrStrings(selectedValues) {
        return (<span>{
            selectedValues.map((e, i) => <span key={i}>{i === 0 ? '' : '-'}{e.value}</span>)
        }</span>)
    }

    // store the selected on open selection panel
    mSelectedOnOpen
    // use to save body's overflow property before onOpen
    mPrevBodyOverflow
    mSelectedNew

    renderStatic() {
        if (this.props.useTouchTap) {
            return (<div className={'react-ultra-selector-static'} onTouchTap={this.onToggle} style={{ background: this.props.disabled ? '#eee' : '#fff' }}>
                {this.state.staticText}
            </div>)
        }
        return (<div className={'react-ultra-selector-static'} onClick={this.onToggle} style={{ background: this.props.disabled ? '#eee' : '#fff' }}>
            {this.state.staticText}
        </div>)
    }

    renderBackdrop() {
        if (!this.props.backdrop) return null
        if (this.props.useTouchTap) {
            return <div className="backdrop" onTouchTap={this.onTouchBackdrop}></div>
        }
        return <div className="backdrop" onClick={this.onTouchBackdrop}></div>
    }

    renderCancel() {
        if (this.props.useTouchTap) {
            return <a className="cancel" onTouchTap={this.onCancel}>{this.props.cancelButton}</a>
        }
        return <a className="cancel" onClick={this.onCancel}>{this.props.cancelButton}</a>
    }

    renderConfirm() {
        if (this.props.useTouchTap) {
            return <a className="confirm" onTouchTap={this.onConfirm}>{this.props.confirmButton}</a>
        }
        return <a className="confirm" onClick={this.onConfirm}>{this.props.confirmButton}</a>
    }

    render() {
        if (!this.state.open) {
            return this.renderStatic()
        }

        const listHeight = `${this.props.rowHeight * this.props.rowsVisible}${this.props.rowHeightUnit}`
        const rowHeight = `${this.props.rowHeight}${this.props.rowHeightUnit}`
        const titleHeight = this.props.titleHeight ? `${this.props.titleHeight}${this.props.titleHeightUnit}` : rowHeight
        const separatorTop = `${this.props.rowHeight * Math.floor(this.props.rowsVisible / 2)}${this.props.rowHeightUnit}`

        return (
            <span>
                {this.renderStatic()}
                <MyPortal>
                    <div className="react-ultra-selector">
                        {this.renderBackdrop()}
                        <div className="caption" style={{ bottom: listHeight, height: titleHeight, lineHeight: titleHeight }}>
                            {this.renderCancel()}
                            <div className="title">{this.state.title}</div>
                            {this.renderConfirm()}
                        </div>
                        <div className="columns" style={{ height: listHeight }}>
                            <table style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}>
                                <tbody>
                                    <tr>
                                    {
                                        this.state.columns.map((elem, index) => (
                                            <td key={index} style={{ position: 'relative' }}>
                                                <IScroll
                                                    ref={`column${index}`} iScroll={iScroll}
                                                    options={{ mouseWheel: true, probeType: 3, bindToWrapper: true }}
                                                    onScroll={this.onScroll} onScrollEnd={this.onScrollEnd}
                                                >
                                                {
                                                    elem.list.map((e, i) => (
                                                        <div
                                                            className={`elem ${this.getElemClass(i, index)}`} key={i}
                                                            ref={index === 0 && i === 0 ? 'elem' : null}
                                                            style={{ height: rowHeight, lineHeight: rowHeight }}
                                                        >
                                                            {e.value}
                                                        </div>
                                                    ))
                                                }
                                                </IScroll>
                                            </td>
                                        ))
                                    }
                                    </tr>
                                </tbody>
                            </table>
                            <div className="separator" style={{ top: separatorTop, height: rowHeight }}></div>
                        </div>
                    </div>
                </MyPortal>
            </span>
        )
    }
}

export const Portal = MyPortal
