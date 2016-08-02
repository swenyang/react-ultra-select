import React, { Component, PropTypes } from 'react'
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
    }

    constructor(props) {
        const [selected, columns] = pushEmptyElements(props)

        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onToggle = this.onToggle.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onConfirm = this.onConfirm.bind(this)

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
        this.registerListeners()
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
        this.registerListeners()
        this.scrollToSelected()
    }

    onScrollEnd(index) {
        this.scrollToSelected()
        this.mScrollTimeout = null
        if (this.props.onDidSelect) {
            const selectedValues = this.getSelectedValues(this.state.columns, this.state.selected)
            this.props.onDidSelect(index, selectedValues[index])
        }
    }

    onScroll(event) {
        const index = this.findColumnIndex(event.target)
        if (index === -1) return
        const elem = this.refs.elem
        if (elem) {
            // listen to scroll end event
            if (this.mScrollTimeout) {
                clearTimeout(this.mScrollTimeout)
            }
            this.mScrollTimeout = setTimeout(() => this.onScrollEnd(index), 500)

            const column = this.refs[`column${index}`]
            if (this.mManualScroll[index] != null) {
                // no null or undefined, use the most updated scrollTop
                for (const i of Object.keys(this.mManualScroll)) {
                    if (this.mManualScroll[i] != null) {
                        const c = this.refs[`column${i}`]
                        if (c.scrollTop !== this.mManualScroll[i]) {
                            c.scrollTop = this.mManualScroll[i]
                            this.mManualScroll[i] = null
                        }
                    }
                }
            }
            const selectedBefore = this.state.selected[index]
            const selectedAfter = this.calculateSelected(column.scrollTop,
                this.props.rowsVisible, elem.clientHeight)
            if (selectedBefore !== selectedAfter) {
                // console.log(`column${index}: ${selectedBefore} => ${selectedAfter}, ${column.scrollTop}`)
                const selected = [...this.state.selected]
                selected[index] = selectedAfter
                const selectedValues = this.getSelectedValues(this.state.columns, selected)
                this.setState({
                    ...this.state,
                    selected,
                    title: this.getTitle(selectedValues),
                    //staticText: this.getStaticText(selectedValues),
                })
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
                this.props.onOpen()
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
                this.props.onClose()
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

    onConfirm() {
        this.onToggle()
        if (this.props.onConfirm) {
            setTimeout(() => {
                this.props.onConfirm()
            }, 0)
        }
    }

    onCancel() {
        this.onToggle(true)
        if (this.props.onCancel) {
            setTimeout(() => {
                this.props.onCancel()
            }, 0)
        }
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

    calculateSelected(offset, visibleCells, cellHeight) {
        const start = Math.floor(visibleCells / 2)
        const num = Math.round(offset / cellHeight)
        return start + num
    }

    findColumnIndex(instance) {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            const column = this.refs[`column${i}`]
            if (column && column === instance) {
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
            const column = this.refs[`column${i}`]
            if (!column) return
            const elem = this.refs.elem
            if (!elem) return
            const newScrollTop = (this.state.selected[i] - Math.floor(this.props.rowsVisible / 2)) * elem.clientHeight
            if (newScrollTop !== column.scrollTop) {
                this.mManualScroll[i] = newScrollTop
                // console.log(`set column${i} scrollTop from ${column.scrollTop} to ${newScrollTop}`)
                column.scrollTop = newScrollTop
            }
        }
    }

    registerListeners() {
        for (let i = 0; i < this.state.columns.length; i++) {
            const column = this.refs[`column${i}`]
            if (column) {
                column.onscroll = this.onScroll
            }
        }
    }

    concatArrStrings(selectedValues) {
        return (<span>{
            selectedValues.map((e, i) => <span key={i}>{i === 0 ? '' : '-'}{e.value}</span>)
        }</span>)
    }

    // store the selected on open selection panel
    mSelectedOnOpen
    // set scroll timeout because there is not scroll end event
    mScrollTimeout
    // mark on setting scrollTop manually
    mManualScroll = {}
    // use to save body's overflow property before onOpen
    mPrevBodyOverflow

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
            return <div className="backdrop" onTouchTap={this.onConfirm}></div>
        }
        return <div className="backdrop" onClick={this.onConfirm}></div>
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
        const numColumns = this.state.columns.length

        return (<span>
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
                        {
                            this.state.columns.map((elem, index) =>
                                <div ref={`column${index}`} key={index} style={{ width: `${100 / numColumns}%`, height: listHeight }} className="column">
                                {
                                    elem.list.map((e, i) =>
                                        <div className={`elem ${this.getElemClass(i, index)}`} key={i} ref={index === 0 && i === 0 ? 'elem' : null} style={{ height: rowHeight, lineHeight: rowHeight }}>
                                            {e.value}
                                        </div>)
                                }
                                </div>)
                        }
                        <div className="separator" style={{ top: separatorTop, height: rowHeight }}></div>
                    </div>
                </div>
            </MyPortal>
        </span>)
    }
}

export const Portal = MyPortal
