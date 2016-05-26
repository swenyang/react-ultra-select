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

function _concatArrStrings(selectedValues) {
    let ret = ''
    for (let i = 0, l = selectedValues.length; i < l; i++) {
        ret += (i === 0 ? '' : '-') + selectedValues[i]
    }
    return ret
}

function _calculateSelected(offset, numCells, visibleCells, cellHeight, totalHeight) {
    let start = Math.floor(visibleCells/2)
    let end = numCells - Math.ceil(visibleCells/2)

    if (offset >= 0) return start
    let maxOffset = visibleCells * cellHeight - totalHeight
    if (offset <= maxOffset) return end

    offset = Math.abs(offset)
    let num = Math.round(offset / cellHeight)
    return start + num
}

export default class UltraSelect extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            list: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
            defaultIndex: PropTypes.number,
        })).isRequired,
        rowsVisible: positiveOddPropType,
        rowHeight: PropTypes.number,
        rowHeightUnit: PropTypes.string,
        backdrop: PropTypes.bool,
        setTitle: PropTypes.func,
        setStaticText: PropTypes.func,
        confirmButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        externalStaticTextClass: PropTypes.string,
    }

    static defaultProps = {
        rowsVisible: 5,
        rowHeight: 2,
        rowHeightUnit: 'em',
        backdrop: true,
        confirmButton: 'CONFIRM',
    }

    constructor(props) {
        let selected = []
        let numEmpty = Math.floor(props.rowsVisible / 2)
        for (let i = 0, l = props.columns.length; i < l; i++) {
            let newList = []
            for (let j = 0; j < numEmpty; j++) newList.push('')
            newList = newList.concat(props.columns[i].list)
            for (let j = 0; j < numEmpty; j++) newList.push('')
            props.columns[i].list = newList

            let d = props.columns[i].defaultIndex || 0
            d += numEmpty
            if (d < numEmpty) d = numEmpty
            if (d > newList.length - 1) d = newList.length - 1
            selected.push(d)
        }

        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.onScrollEnd = this.onScrollEnd.bind(this)
        this.onToggle = this.onToggle.bind(this)

        this.state = {
            selected,
            title: this.getTitle(props.columns, selected, false),
            staticText: this.getTitle(props.columns, selected, true),
            open: false,
        }
    }

    getTitle(columns, selected, isStatic) {
        let ret = []
        for (let i = 0, l = columns.length; i < l; i++) {
            ret.push(columns[i].list[selected[i]])
        }
        if (isStatic && this.props.setStaticText) {
            return this.props.setStaticText(ret)
        }
        else if (!isStatic && this.props.setTitle) {
            return this.props.setTitle(ret)
        }
        else {
            return _concatArrStrings(ret)
        }
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

    onScroll(instance) {
        //console.log(instance.y)
        let index = this.findIScrollIndex(instance)
        if (index === -1) return
        let elem = this.refs[`elem${index}`]
        if (elem) {
            let selectedBefore = this.state.selected[index]
            let selectedNew = _calculateSelected(instance.y, this.props.columns[index].list.length, this.props.rowsVisible, elem.clientHeight, instance.scrollerHeight)
            if (selectedBefore !== selectedNew) {
                let selected = [...this.state.selected]
                selected[index] = selectedNew
                this.setState({
                    ...this.state,
                    selected,
                    title: this.getTitle(this.props.columns, selected, false),
                    staticText: this.getTitle(this.props.columns, selected, true),
                })
            }
        }
    }

    onScrollEnd(instance) {
        let index = this.findIScrollIndex(instance)
        let elem = this.refs[`elem${index}`]
        if (elem) {
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

    componentDidUpdate() {
        this.scrollToSelected()
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
                                        style={{height: rowHeight, lineHeight: rowHeight}}>{e}</div>)
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
