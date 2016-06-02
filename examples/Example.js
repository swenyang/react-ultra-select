import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import UltraSelect from '../src/UltraSelect'
//import UltraSelect from '../dist/react-ultra-select'

import "./Example.less"

function concatArrStrings(selectedValues) {
    let ret = <h1>you</h1>
    for (let i = 0, l = selectedValues.length; i < l; i++) {
        ret += selectedValues[i].value
    }
    //return <div>{ret}</div>
    return <div>
        {
            selectedValues.map((e, i) => <span key={i}>{e.value}</span>)
        }
    </div>
}

class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            serial: 1
        }
    }

    onSelect() {
        //console.log(this.refs.selectedValues)
    }

    onClick() {
        this.setState({
            serial: this.state.serial+1
        })
    }

    render() {
        var columns = [
            {
                list: [
                    {key: 2011, value: 2011},
                    {key: 2012, value: 2012},
                    {key: 2013, value: 2013},
                    {key: 2014, value: 2014},
                    {key: 2015, value: 2015},
                    {key: 2016, value: 2016},
                    {key: 2017, value: 2017},
                    {key: 2018, value: 2018},
                    {key: 2019, value: 2019},
                    {key: 2020, value: 2020},
                    {key: 2021, value: 2021},
                    {key: 2022, value: 2022},
                    {key: 2023, value: 2023},
                ],
                defaultIndex: 3
            },
            {
                list: [
                    {key: 20, value: '20'},
                    {key: 30, value: '30'},
                    {key: 40, value: '40'},
                ],
                defaultIndex: 3
            },
            {
                list: [
                    {key: 'a', value: <span style={{backgroundColor: '#f00'}}>a</span>},
                    {key: 'b', value: <span style={{backgroundColor: '#00f'}}>b</span>},
                ],
            },
        ]
        for (let i = 0; i < this.state.serial; i++) {
            columns[2].list.push({
                key: i, value: i
            })
        }
        return <div>
                <div onClick={this.onClick.bind(this)}>Hello world!</div>
                click <UltraSelect ref="ultra" columns={columns}
                                   onSelect={(e, v) => console.log("select", e, v)}
                                   onDidSelect={(e, v) => console.log("did select", e, v)}
                                   confirmButton="确定"
                                   getStaticText={concatArrStrings} backdrop={false}></UltraSelect> to select
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))
