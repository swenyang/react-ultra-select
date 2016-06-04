# React Ultra Select
A highly extensible component for React, good substitution for HTML 'select' element.

Basically React Ultra Select works like the 'select' and 'option' in HTML, however, it accepts any group of data and provides event callbacks for implementing sophisticated features. Very handy.

## Features
- Mobile device oriented

	Designed for mobile devices. You can use it on desktop browsers, but the options showing up at the bottom might not give you best experience.

- iOS like

	Totally iOS like, except the filters and the loop.

- Dynamic

	You can pass N groups of data to React Ultra Select. It will handle data automatically and divide into N columns respectively.

	Also, you can customize the number visible rows and the height of each row.

- Extensible

	Each time the React Ultra Select selects a group of value, it will emit an `onSelect` event. Each time it stops scrolling, it will emit an `onDidSelect` event. These events will be very useful for make more powerful selections.

	For example, I write a [React Date Picker][2] based on this component. It's much more complicated.

# How to use

This component relies on some libraries.

```
npm i react --save
npm i react-dom --save
npm i iscroll --save
npm i iscroll-react --save
```

Using it in your project:
```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import UltraSelect from 'react-ultra-select'

class SomeComponent extends Component {
	render() {
	var columns = [
            {
                list: [
                    {key: 1, value: 'Male'},
                    {key: 2, value: 'Female'},
                    {key: 3, value: 'Others'},
                ],
            },
            {
                list: [
                    {key: 10, value: '0-20'},
                    {key: 20, value: '20-29'},
                    {key: 30, value: '30-39'},
                    {key: 40, value: '40-49'},
                    {key: 50, value: '50+'},
                ],
                defaultIndex: 3
            },
        ]
		return <UltraSelect columns={columns}></UltraSelect>
	}
}
```

Note that you should pack `iscroll-probe` instead of `iscroll` in your production code, cause this component use `iscroll-probe` to calculate scroll offset and selected indecies.
```js
import iScrollProbe from "iscroll/build/iscroll-probe"
```

# Props

 <table>
    <thead>
        <tr>
            <td><b>Prop Name</b></td>
            <td><b>Sub Prop</b></td>
            <td><b>Required</b></td>
            <td><b>Type</b></td>
            <td><b>Description</b></td>
            <td><b>Example</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>`columns`</td>
            <td></td>
            <td>Yes</td>
            <td>Array</td>
            <td>Each element contains one selection list and default index</td>
            <td>```[{
                    list: [{key: 1, value: 1}],
                    defaultIndex: 0,
                }]```</td>
        </tr>
        <tr>
            <td></td>
            <td>`list`</td>
            <td>Yes</td>
            <td>Array</td>
            <td>An array of options</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>`defaultIndex`</td>
            <td>Default to `0`</td>
            <td>Number</td>
            <td>Default index for selected element, starting from 0</td>
            <td></td>
        </tr>
        <tr>
            <td>`rowsVisible`</td>
            <td></td>
            <td>Default to `7`</td>
            <td>Odd Number</td>
            <td>Visible selections at one time</td>
            <td>`3`, `5`, `7`, `9` etc.</td>
        </tr>
        <tr>
            <td>`rowHeight`</td>
            <td></td>
            <td>Default to `25`</td>
            <td>Number</td>
            <td>Height for each row</td>
            <td>`2`</td>
        </tr>
        <tr>
            <td>`rowHeightUnit`</td>
            <td></td>
            <td>Default to `px`</td>
            <td>String</td>
            <td>Height unit for each row, works with `rowHeight`</td>
            <td>`px`, `em`, `rem` etc.</td>
        </tr>
        <tr>
            <td>`backdrop`</td>
            <td></td>
            <td>Default to `true`</td>
            <td>Boolean</td>
            <td>Whether to show backdrop or not</td>
            <td>`false`</td>
        </tr>
        <tr>
            <td>`getTitle`</td>
            <td></td>
            <td>No</td>
            <td>Function</td>
            <td>A function to set the bottom title, will be called with an array of selected values</td>
            <td>`(selectedValues) => <div>Please select</div>`</td>
        </tr>
        <tr>
            <td>`getStaticText`</td>
            <td></td>
            <td>No</td>
            <td>Function</td>
            <td>A function to set the text in collapse state, will be called with an array of selected values</td>
            <td>`(selectedValues) => <div>Please select</div>`</td>
        </tr>
        <tr>
            <td>`confirmButton`</td>
            <td></td>
            <td>Default to `CONFIRM`</td>
            <td>String or React Node</td>
            <td>Used to customize the confirm button label</td>
            <td>`OK`</td>
        </tr>
        <tr>
            <td>`onDidSelect`</td>
            <td></td>
            <td>No</td>
            <td>Function</td>
            <td>Will be called with the value of the selecting column when selection is made and scrolling stops</td>
            <td>`(selectedValue) => console.log(selectValue)`</td>
        </tr>
        <tr>
            <td>`onSelect`</td>
            <td></td>
            <td>No</td>
            <td>Function</td>
            <td>Will be called with the value of the selecting column when selection is made</td>
            <td>`(selectedValue) => console.log(selectValue)`</td>
        </tr>
    </tbody>
</table>

# Functions

- `UltraSelect.selectedValues`

Get the current array of selected values, each element contains a `key` and a `value`.

# Examples
- Online

	Open <https://swenyang.github.io/react-ultra-select> to see online demo.

- Local

	Clone this repo, and run `npm run examples`. Then navigate to <http://localhost:8080> to see examples.

# TODO
- Removing iscroll-probe

	React Ultra Select currently relies on [React IScroll][1] and iscroll-probe, it's a bit too heavy. Should find a smaller solution for calculating selected indecies.

- Transitions

	Add some smooth transitions for backdrop and columns showing up.

[1]: https://github.com/swenyang/react-iscroll
[2]: https://github.com/swenyang/react-date-picker