import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import UltraSelect from '../src/UltraSelect'

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
    render() {
        var columns = [
            {
                list: [
                    {key: 2016, value: 2016},
                    {key: 2017, value: 2017},
                    {key: 2018, value: 2018},
                    {key: 2019, value: 2019},
                    {key: 2020, value: 2020},
                ],
                defaultIndex: 2
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
        return <div>
                <div>Hello world!</div>
                click <UltraSelect columns={columns} onDidSelect={e => console.log("did select", e)}
                                   setStaticText={concatArrStrings}></UltraSelect> to select
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))
