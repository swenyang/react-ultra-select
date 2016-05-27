import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import IScroll from 'iscroll-react'
import iScroll from 'iscroll/build/iscroll-probe'

import './UltraSelect.less'

const positiveOddPropType = (props, propName, componentName) => {
    const val = props[propName]
    if (typeof val === 'number') {
        if (val < 0) {
            return new Error(`${componentName}: ${propName} should be passed a positive odd number.`)
        }
        else if (val % 2 === 0) {
            return new Error(`${componentName}: ${propName} should be passed a positive odd number.`)
        }
    }
    else {
        return new Error(`${componentName}: ${propName} should be passed a positive odd number.`)
    }
}

function _pushEmptyElements(props) {
    let selected = []
    let numEmpty = Math.floor(props.rowsVisible / 2)
    for (let i = 0, l = props.columns.length; i < l; i++) {
        let newList = []
        for (let j = 0; j < numEmpty; j++) newList.push({key:'', value:''})
        newList = newList.concat(props.columns[i].list)
        for (let j = 0; j < numEmpty; j++) newList.push({key:'', value:''})
        props.columns[i].list = newList

        let d = props.columns[i].defaultIndex || 0
        d += numEmpty
        let max = newList.length - Math.ceil(props.rowsVisible/2)
        if (d < numEmpty) d = numEmpty
        if (d > max) d = max
        selected.push(d)
    }
    return selected
}

export default class UltraSelect extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            list: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
                key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                value: PropTypes.node.isRequired,
            })), PropTypes.func]).isRequired,
            defaultIndex: PropTypes.number,
        })).isRequired,
        rowsVisible: positiveOddPropType,
        rowHeight: PropTypes.number,
        rowHeightUnit: PropTypes.string,
        backdrop: PropTypes.bool,
        getTitle: PropTypes.func,
        getStaticText: PropTypes.func,
        confirmButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        externalStaticTextClass: PropTypes.string,
        onDidSelect: PropTypes.func,
        onSelect: PropTypes.func,
    }

    static defaultProps = {
        rowsVisible: 5,
        rowHeight: 25,
        rowHeightUnit: 'px',
        backdrop: true,
        confirmButton: 'CONFIRM',
    }

    _selectedNew = false
    _receiveNewProps = false

    constructor(props) {
        let selected = _pushEmptyElements(props)

        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onToggle = this.onToggle.bind(this)

        let selectedValues = this.getSelectedValues(props.columns, selected)
        this.state = {
            selected,
            title: this.getTitle(selectedValues),
            staticText: this.getStaticText(selectedValues),
            open: false,
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
        for (let i = 0, l = this.props.columns.length; i < l; i++) {
            let iScroll = this.refs[`iscroll${i}`]
            if (iScroll && iScroll.iScrollInstance === instance) {
                return i
            }
        }
        return -1
    }

    get selectedValues() {
        return this.getSelectedValues(this.props.columns, this.state.selected)
    }

    onScroll(instance) {
        //console.log(instance.y)
        let index = this.findIScrollIndex(instance)
        if (index === -1) return
        let elem = this.refs[`elem${index}`]
        if (elem) {
            let selectedBefore = this.state.selected[index]
            let selectedNew = this.calculateSelected(instance.y, this.props.columns[index].list.length, this.props.rowsVisible, elem.clientHeight, instance.scrollerHeight)
            if (selectedBefore !== selectedNew) {
                let selected = [...this.state.selected]
                selected[index] = selectedNew
                let selectedValues = this.getSelectedValues(this.props.columns, selected)
                this.setState({
                    ...this.state,
                    selected,
                    title: this.getTitle(selectedValues),
                    staticText: this.getStaticText(selectedValues),
                })
                this._selectedNew = true
                if (this.props.onSelect) {
                    this.props.onSelect(selectedValues)
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
                let selectedValues = this.getSelectedValues(this.props.columns, this.state.selected)
                if (this.props.onDidSelect) {
                    this.props.onDidSelect(selectedValues)
                }
            }

            // incase instance bounce back on top/bottom
            if (instance.y >= 0) return
            let maxOffset = this.props.rowsVisible * elem.clientHeight - instance.scrollerHeight
            if (instance.y <= maxOffset) return


            instance.scrollTo(0, - (this.state.selected[index] - Math.floor(this.props.rowsVisible/2)) * elem.clientHeight, 100)
        }
    }

    componentDidMount() {
        this.scrollToSelected()
    }

    componentWillReceiveProps(nextProps) {
        _pushEmptyElements(nextProps)
        this._receiveNewProps = true
    }

    componentDidUpdate() {
        this.scrollToSelected()
        if (this._receiveNewProps) {
            this._receiveNewProps = false
            for (var i = 0, l = this.props.columns.length; i < l; i++) {
                var iscroll = this.refs[`iscroll${i}`]
                if (iscroll) {
                    iscroll.updateIScroll()
                }
            }
        }
    }

    scrollToSelected() {
        for (let i = 0, l = this.props.columns.length; i < l; i++) {
            let elem = this.refs[`elem${i}`]
            if (!elem) return
            this.refs[`iscroll${i}`].iScrollInstance.scrollTo(0, - (this.state.selected[i] - Math.floor(this.props.rowsVisible/2)) * elem.clientHeight, 0)
        }
    }

    getElemClass(elemIndex, columnIndex) {
        if (elemIndex === this.state.selected[columnIndex]) return 'elem-level-1'
        else if (Math.abs(elemIndex - this.state.selected[columnIndex]) === 1) return 'elem-level-2'
        else if (Math.abs(elemIndex - this.state.selected[columnIndex]) === 2) return 'elem-level-3'
        else return 'elem-level-4'
    }

    onToggle(e) {
        e.preventDefault()
        this.setState({
            ...this.state,
            open: !this.state.open
        })
    }

    renderStatic() {
        return <div className={`react-ultra-selector-static${this.props.externalStaticTextClass ? this.props.externalStaticTextClass : ''}`} onClick={this.onToggle}>{this.state.staticText}</div>
    }

    render() {
        if (!this.state.open) {
            return this.renderStatic()
        }

        let listHeight = `${this.props.rowHeight*this.props.rowsVisible}${this.props.rowHeightUnit}`
        let rowHeight = `${this.props.rowHeight}${this.props.rowHeightUnit}`
        let separatorTop = `${this.props.rowHeight*Math.floor(this.props.rowsVisible/2)}${this.props.rowHeightUnit}`

        return <span>
            {this.renderStatic()}
            <div className='react-ultra-selector'>
                {this.props.backdrop ? <div className='backdrop' onClick={this.onToggle}></div> : null}
                <div className='caption' style={{bottom: listHeight, height: rowHeight, lineHeight: rowHeight}}>
                    <div className='title'>{this.state.title}</div>
                    <a className='confirm' href='#' onClick={this.onToggle}>{this.props.confirmButton}</a>
                </div>
                <div className='columns' style={{height: listHeight}}>
                    <table><tbody><tr>
                    {
                    this.props.columns.map((elem, index) =>
                        <td key={index}><IScroll ref={`iscroll${index}`} iScroll={iScroll} options={{mouseWheel:true, probeType:2, bindToWrapper:true}} onScroll={this.onScroll} onScrollEnd={this.onScrollEnd}>
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
        </span>
    }
}
