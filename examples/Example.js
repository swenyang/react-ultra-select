import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import UltraSelect from '../src/UltraSelect'

import "./Example.less"

class Example extends Component {
    render() {
        var columns = [
            {
                list: [2016, 2017, 2018, 2019, 2020, 2021],
                defaultIndex: 2
            },
            {
                list: [1, 2, 3, 44444, 5, 6, 7, 8, 9, 10, 11, 12],
                defaultIndex: 3
            },
            {
                list: ['a', 'b', 'c', 'd']
            },
        ]
        return <div>
                <div>Hello world!</div>
                click <UltraSelect columns={columns}></UltraSelect> to select
            </div>
    }
}

ReactDOM.render(<Example />, document.getElementById("root"))
