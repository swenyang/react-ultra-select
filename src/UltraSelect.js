import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import equal from 'deep-equal'
import MyPortal from './Portal'

import './UltraSelect.less'

const positiveOddPropType = (props, propName, componentName) => {
    const val = props[propName]
    if (typeof val === 'number' && val > 0 && val % 2 !== 0) {
        return null
    }
    else {
        return new Error(`${componentName}: ${propName} should be passed a positive odd number.`)
    }
}

const _pushEmptyElements = (props) => {
    let selected = []
    let numEmpty = Math.floor(props.rowsVisible / 2)
    let columns = []
    for (let i = 0, l = props.columns.length; i < l; i++) {
        // push several empty elements before & after for each column
        let newList = []
        for (let j = 0; j < numEmpty; j++) {
            newList.push({
                key:'',
                value:''
            })
        }
        newList = newList.concat(props.columns[i].list)
        for (let j = 0; j < numEmpty; j++) {
            newList.push({
                key:'',
                value:''
            })
        }

        // calculate selected index
        let index = props.columns[i].defaultIndex || 0
        index += numEmpty
        let max = newList.length - Math.ceil(props.rowsVisible/2)
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
        onOpen: PropTypes.func,     // open select panel
        onClose: PropTypes.func,    // close select panel
        onConfirm: PropTypes.func,  // click confirm button or click backdrop
        onCancel: PropTypes.func,   // click cancel button
        onSelect: PropTypes.func,   // scroll up and down to select elements while select panel is open, good time for playing sound effects
        onDidSelect: PropTypes.func, // stop scrolling up and down while select panel is open, useful for real-time selection
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

    // store the selected on open selection panel
    _selectedOnOpen
    // set scroll timeout because there is not scroll end event
    _scrollTimeout

    constructor(props) {
        let [selected, columns] = _pushEmptyElements(props)

        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onToggle = this.onToggle.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onConfirm = this.onConfirm.bind(this)

        let selectedValues = this.getSelectedValues(columns, selected)
        this.state = {
            selected,
            title: this.getTitle(selectedValues),
            staticText: this.getStaticText(selectedValues),
            open: this.props.isOpen,
            columns,
        }
    }

    getSelectedValues(columns, selected) {
        let ret = []
        for (let i = 0, l = columns.length; i < l; i++) {
            ret.push(columns[i].list[selected[i]])
        }
        return ret
    }

    getTitle(selectedValues) {
        if (this.props.getTitle) {
            return this.props.getTitle(selectedValues)
        }
        else {
            return null
            //return this.concatArrStrings(selectedValues)
        }
    }

    getStaticText(selectedValues) {
        if (this.props.getStaticText) {
            return this.props.getStaticText(selectedValues)
        }
        else {
            return this.concatArrStrings(selectedValues)
        }
    }

    concatArrStrings(selectedValues) {
        return <span>{
                selectedValues.map((e, i) => <span key={i}>{i===0?'':'-'}{e.value}</span>)
            }</span>
    }

    calculateSelected(offset, visibleCells, cellHeight) {
        let start = Math.floor(visibleCells/2)
        let num = Math.round(offset / cellHeight)
        return start + num
    }

    findColumnIndex(instance) {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            let column = this.refs[`column${i}`]
            if (column && column === instance) {
                return i
            }
        }
        return -1
    }

    get selectedValues() {
        return this.getSelectedValues(this.state.columns, this.state.selected)
    }

    onScrollEnd(index) {
        this.scrollToSelected()
        this._scrollTimeout = null
        if (this.props.onDidSelect) {
            let selectedValues = this.getSelectedValues(this.state.columns, this.state.selected)
            this.props.onDidSelect(index, selectedValues[index])
        }
    }

    onScroll(event) {
        let index = this.findColumnIndex(event.target)
        if (index === -1) return
        let elem = this.refs.elem
        if (elem) {
            let column = this.refs[`column${index}`]

            // listen to scroll end event
            if (this._scrollTimeout) {
                clearTimeout(this._scrollTimeout)
            }
            this._scrollTimeout = setTimeout(() => this.onScrollEnd(index), 800)

            let selectedBefore = this.state.selected[index]
            let selectedAfter = this.calculateSelected(column.scrollTop, this.props.rowsVisible, elem.clientHeight)
            if (selectedBefore !== selectedAfter) {
                let selected = [...this.state.selected]
                selected[index] = selectedAfter
                let selectedValues = this.getSelectedValues(this.state.columns, selected)
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

    componentDidMount() {
        // incase mount with isOpen=true
        this.scrollToSelected()
    }

    componentWillReceiveProps(nextProps) {
        let [selected, columns] = _pushEmptyElements(nextProps)
        let selectedValues = this.getSelectedValues(columns, selected)
        this.setState({
            ...this.state,
            selected,
            title: this.getTitle(selectedValues),
            staticText: this.getStaticText(selectedValues),
            columns,
            open: nextProps.isOpen == null ? this.state.open : nextProps.isOpen,
        })
        this._selectedOnOpen = selected
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Object.keys(this.props).length !== Object.keys(nextProps).length) {
            return true
        }
        for (let key of Object.keys(nextProps)) {
            if (key === 'columns') {
                if (!equal(nextProps.columns, this.props.columns)) {
                    return true
                }
            }
            else if (!key.startsWith('on') && nextProps[key] !== this.props[key]) {
                return true
            }
        }
        //console.log('equal props')

        if (Object.keys(this.state).length !== Object.keys(nextState).length) {
            return true
        }
        for (let key of Object.keys(nextState)) {
            if (key === 'title' || key === 'staticText') {
                continue // ignore title/staticText because they are changed by columns & selected
            }
            if (key === 'selected' || key === 'columns') {
                if (!equal(nextState[key], this.state[key])) {
                    return true
                }
            }
            else if (nextState[key] !== this.state[key]) {
                return true
            }
        }
        //console.log('no need to update')
        return false
    }

    componentDidUpdate() {
        this.updateListeners()
        this.scrollToSelected()
    }

    scrollToSelected() {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            let column = this.refs[`column${i}`]
            if (!column) return
            let elem = this.refs.elem
            if (!elem) return
            column.scrollTop = (this.state.selected[i] - Math.floor(this.props.rowsVisible/2)) * elem.clientHeight
        }
    }

    updateListeners() {
        for (let i = 0; i < this.state.columns.length; i++) {
            let column = this.refs[`column${i}`]
            if (!column) continue
            column.onscroll = this.onScroll
        }
    }

    getElemClass(elemIndex, columnIndex) {
        let distance = Math.abs(elemIndex - this.state.selected[columnIndex])
        switch (distance) {
            case 0: return 'elem-level-1'
            case 1: return 'elem-level-2'
            case 2: return 'elem-level-3'
            default:
                return 'elem-level-4'
        }
    }

    onToggle(isCancel = false) {
        if (!this.state.open && this.props.disabled) {
            return
        }
        if (!this.state.open) {
            if (this.props.onOpen) {
                this.props.onOpen()
            }
            this._selectedOnOpen = this.state.selected
            this.setState({
                ...this.state,
                open: true,
            })
        }
        else {
            if (this.props.onClose) {
                this.props.onClose()
            }
            if (isCancel === true) {
                // if cancel selection, revert state
                let selectedValues = this.getSelectedValues(this.state.columns, this._selectedOnOpen)
                this.setState({
                    ...this.state,
                    open: false,
                    selected: this._selectedOnOpen,
                    title: this.getTitle(selectedValues),
                    staticText: this.getStaticText(selectedValues),
                })
            }
            else {
                // if confirm selection, update static text
                let selectedValues = this.getSelectedValues(this.state.columns, this.state.selected)
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
        setTimeout(() => {
            if (this.props.onConfirm) {
                this.props.onConfirm()
            }
        }, 0)
    }

    onCancel() {
        this.onToggle(true)
        setTimeout(() => {
            if (this.props.onCancel) {
                this.props.onCancel()
            }
        }, 0)
    }

    renderStatic() {
        if (this.props.useTouchTap) {
            return <div className={'react-ultra-selector-static'} onTouchTap={this.onToggle} style={{background: this.props.disabled ? '#eee' : '#fff'}}>
                {this.state.staticText}
            </div>
        }
        return <div className={'react-ultra-selector-static'} onClick={this.onToggle} style={{background: this.props.disabled ? '#eee' : '#fff'}}>
            {this.state.staticText}
        </div>
    }

    renderBackdrop() {
        if (!this.props.backdrop) return null
        if (this.props.useTouchTap) {
            return <div className='backdrop' onTouchTap={this.onConfirm}></div>
        }
        return <div className='backdrop' onClick={this.onConfirm}></div>
    }

    renderCancel() {
        if (this.props.useTouchTap) {
            return <a className='cancel' onTouchTap={this.onCancel}>{this.props.cancelButton}</a>
        }
        return <a className='cancel' onClick={this.onCancel}>{this.props.cancelButton}</a>
    }

    renderConfirm() {
        if (this.props.useTouchTap) {
            return <a className='confirm' onTouchTap={this.onConfirm}>{this.props.confirmButton}</a>
        }
        return <a className='confirm' onClick={this.onConfirm}>{this.props.confirmButton}</a>
    }

    render() {
        if (!this.state.open) {
            return this.renderStatic()
        }

        let listHeight = `${this.props.rowHeight*this.props.rowsVisible}${this.props.rowHeightUnit}`
        let rowHeight = `${this.props.rowHeight}${this.props.rowHeightUnit}`
        let titleHeight = this.props.titleHeight ? `${this.props.titleHeight}${this.props.titleHeightUnit}` : rowHeight
        let separatorTop = `${this.props.rowHeight*Math.floor(this.props.rowsVisible/2)}${this.props.rowHeightUnit}`
        let numColumns = this.state.columns.length

        return <span>
            {this.renderStatic()}
            <MyPortal>
                <div className='react-ultra-selector'>
                    {this.renderBackdrop()}
                    <div className='caption' style={{bottom: listHeight, height: titleHeight, lineHeight: titleHeight}}>
                        {this.renderCancel()}
                        <div className='title'>{this.state.title}</div>
                        {this.renderConfirm()}
                    </div>
                    <div className='columns' style={{height: listHeight}}>
                        {
                            this.state.columns.map((elem, index) =>
                                <div ref={`column${index}`} key={index} style={{width: `${1/numColumns*100}%`, height: listHeight}} className="column">
                                {
                                    elem.list.map((e, i) =>
                                        <div className={'elem ' + this.getElemClass(i, index)} key={i} ref={index === 0 && i === 0 ? `elem` : null}
                                            style={{height: rowHeight, lineHeight: rowHeight}}>{e.value}</div>)
                                }
                                </div>)
                        }
                        <div className='separator' style={{top: separatorTop, height: rowHeight}}></div>
                    </div>
                </div>
            </MyPortal>
        </span>
    }
}

export const Portal = MyPortal
