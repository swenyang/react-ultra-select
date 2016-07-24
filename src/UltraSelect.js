import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import IScroll from 'iscroll-react'
import iScroll from 'iscroll/build/iscroll-probe'
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
        confirmButton: 'CONFIRM',
        cancelButton: 'CANCEL',
        disabled: false,
        useTouchTap: false,
    }

    _selectedNew = false
    _selectedOnOpen

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
            return this.concatArrStrings(selectedValues)
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

    calculateSelected(offset, numCells, visibleCells, cellHeight, totalHeight) {
        let start = Math.floor(visibleCells/2)
        let end = numCells - Math.ceil(visibleCells/2)

        if (offset >= 0) return start
        let maxOffset = visibleCells * cellHeight - totalHeight
        if (offset <= maxOffset) return end

        offset = Math.abs(offset)
        let num = Math.round(offset / cellHeight)
        return start + num
    }

    findIScrollIndex(instance) {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            let iScroll = this.refs[`iscroll${i}`]
            if (iScroll && iScroll.iScrollInstance === instance) {
                return i
            }
        }
        return -1
    }

    get selectedValues() {
        return this.getSelectedValues(this.state.columns, this.state.selected)
    }

    onScroll(instance) {
        //console.log(instance.y)
        let index = this.findIScrollIndex(instance)
        if (index === -1) return
        let elem = this.refs[`elem${index}`]
        if (elem) {
            let selectedBefore = this.state.selected[index]
            let selectedNew = this.calculateSelected(instance.y, this.state.columns[index].list.length, this.props.rowsVisible, elem.clientHeight, instance.scrollerHeight)
            if (selectedBefore !== selectedNew) {
                //console.log("select new index", selectedNew, selectedBefore)
                let selected = [...this.state.selected]
                selected[index] = selectedNew
                let selectedValues = this.getSelectedValues(this.state.columns, selected)
                this.setState({
                    ...this.state,
                    selected,
                    title: this.getTitle(selectedValues),
                    //staticText: this.getStaticText(selectedValues),
                })
                this._selectedNew = true
                if (this.props.onSelect) {
                    this.props.onSelect(index, selectedValues[index])
                }
            }
        }
    }

    onScrollEnd(instance) {
        let index = this.findIScrollIndex(instance)
        let elem = this.refs[`elem${index}`]
        if (elem) {
            if (this._selectedNew) {
                this._selectedNew = false
                let selectedValues = this.getSelectedValues(this.state.columns, this.state.selected)
                if (this.props.onDidSelect) {
                    this.props.onDidSelect(index, selectedValues[index])
                }
            }

            // incase instance bounce back on top/bottom
            if (instance.y >= 0) return
            let maxOffset = this.props.rowsVisible * elem.clientHeight - instance.scrollerHeight
            if (instance.y <= maxOffset) return

            instance.scrollTo(0, - (this.state.selected[index] - Math.floor(this.props.rowsVisible/2)) * elem.clientHeight, 0)
        }
    }

    componentDidMount() {
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

    componentDidUpdate() {
        // use setTimeout(func, 0) to fix async data bugs
        setTimeout(() => {
            for (var i = 0, l = this.state.columns.length; i < l; i++) {
                var iscroll = this.refs[`iscroll${i}`]
                if (iscroll) {
                    iscroll.updateIScroll()
                }
            }
            this.scrollToSelected()
        }, 0)
    }

    scrollToSelected() {
        for (let i = 0, l = this.state.columns.length; i < l; i++) {
            let elem = this.refs[`elem${i}`]
            if (!elem) return
            this.refs[`iscroll${i}`].iScrollInstance.scrollTo(0, - (this.state.selected[i] - Math.floor(this.props.rowsVisible/2)) * elem.clientHeight, 0)
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
        if (this.props.onConfirm) {
            this.props.onConfirm()
        }
    }

    onCancel() {
        this.onToggle(true)
        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    renderStatic() {
        if (this.props.useTouchTap) {
            return <div className={'react-ultra-selector-static'} onTouchTap={this.onToggle} style={{background: this.props.disabled ? '#eee' : '#fff'}}>{this.state.staticText}</div>
        }
        return <div className={'react-ultra-selector-static'} onClick={this.onToggle} style={{background: this.props.disabled ? '#eee' : '#fff'}}>{this.state.staticText}</div>
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
                        <table><tbody><tr>
                        {
                        this.state.columns.map((elem, index) =>
                            <td key={index}><IScroll ref={`iscroll${index}`} iScroll={iScroll} options={{mouseWheel:true, probeType:3, bindToWrapper:true}} onScroll={this.onScroll} onScrollEnd={this.onScrollEnd}>
                                {
                                    elem.list.map((e, i) =>
                                        <div className={'elem ' + this.getElemClass(i, index)} key={i} ref={`elem${i}`}
                                            style={{height: rowHeight, lineHeight: rowHeight}}>{e.value}</div>)
                                }
                            </IScroll></td>)
                        }
                        </tr></tbody></table>
                        <div className='separator' style={{top: separatorTop, height: rowHeight}}></div>
                    </div>
                </div>
            </MyPortal>
        </span>
    }
}

export const Portal = MyPortal
