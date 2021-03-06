**Migarted to [KeyUI Select](https://palifeh5.github.io/key-ui/#/api/select). This repo is not longer maintained.**

# React Ultra Select

[Read Chinese documentation here 中文文档点此](https://github.com/swenyang/react-ultra-select/blob/master/README_zh-cn.md)

## Introduction

React Ultra Select is a selection component based on React. It could be good substitutions for HTML `select` and `option` tags on mobile platforms.

Basically React Ultra Select works like the `select` and `option` tags in HTML, however, it’s platform independent, supports multi-column selection and provides many event callbacks for implementing more powerful features. Very handy.

Version 1.0.x uses [iScroll](http://iscrolljs.com/) which provides smoother scrolling experience, however, increases file size significantly.
Version 1.1.x uses `div`'s scrolling event and removes dependency of [iScroll](http://iscrolljs.com/), however, it's hard to make a selection when there are a lot of elements. **Still working in progress**.

## Features

- **Compatible**

	Works fine on all platforms, no matter iOS, Android or Desktop browsers.

- **Dynamic**

	You can pass groups of data to React Ultra Select. It will handle data automatically and divide them into `N` columns respectively.

	Also, you can customize the number visible rows and the height of each row, pass images or any React node as an selection other than a string.

- **Extensible**

	Supports 6 types of events for composing more powerful components. For example, I write a [React Date Picker](#)[2](#) based on this component.

## How to use

```  
npm i react-ultra-select --save
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
                defaultIndex: 1,
            },
        ]
		return <UltraSelect columns={columns}></UltraSelect>
	}
}
```

## Props

### Required Props

- columns

	Type: Array

	Description: an array with each element containing one selection list and its default index.

	Sample:

	```js
	[
	    {
	        list: [{
	            key: 1,
	            value: 1
	        }],
	        defaultIndex: 0,
	    }
	]
	```

### Optional Props

<table>
    <thead>
        <tr>
            <td><b>Prop Name</b></td>
            <td><b>Default Value</b></td>
            <td><b>Type</b></td>
            <td><b>Description</b></td>
            <td><b>Sample</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>rowsVisible</td>
            <td>5</td>
            <td>Odd Number</td>
            <td>Visible rows in selection panel</td>
            <td>3, 5, 7, 9 etc.</td>
        </tr>
        <tr>
            <td>rowHeight</td>
            <td>25</td>
            <td>Number</td>
            <td>Height for each row in selection panel</td>
            <td></td>
        </tr>
        <tr>
            <td>rowHeightUnit</td>
            <td>px</td>
            <td>String</td>
            <td>Height unit for each row, works with rowHeight</td>
            <td>px, em, rem etc.</td>
        </tr>
        <tr>
            <td>backdrop</td>
            <td>true</td>
            <td>Boolean</td>
            <td>Whether to show black backdrop or not</td>
            <td></td>
        </tr>
        <tr>
            <td>backdropAction</td>
            <td>'confirm'</td>
            <td>'confirm', 'cancel', or 'none'</td>
            <td>The behavior when you click on the backdrop. If you pass `confirm`, clicking backdrop is same as clicking confirm button.</td>
            <td></td>
        </tr>
        <tr>
            <td>confirmButton</td>
            <td>'Confirm'</td>
            <td>String or React Node</td>
            <td>Used to customize the confirm button label</td>
            <td></td>
        </tr>
        <tr>
            <td>cancelButton</td>
            <td>'Cancel'</td>
            <td>String or React Node</td>
            <td>Used to customize the cancel button label</td>
            <td></td>
        </tr>
        <tr>
            <td>disabled</td>
            <td>false</td>
            <td>Boolean</td>
            <td>Disable selection panel or not</td>
            <td></td>
        </tr>
        <tr>
            <td>disableCancel</td>
            <td>false</td>
            <td>Boolean</td>
            <td>Disable cancel button and make it invisible</td>
            <td></td>
        </tr>
        <tr>
            <td>useTouchTap</td>
            <td>false</td>
            <td>Boolean</td>
            <td>Use onTouchTap event instead of `onClick`, work with [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)</td>
            <td></td>
        </tr>
        <tr>
            <td>isOpen</td>
            <td>null</td>
            <td>Boolean or null</td>
            <td>Whether the selection panel shows up or not by default</td>
            <td></td>
        </tr>
        <tr>
            <td>getTitle</td>
            <td></td>
            <td>Function</td>
            <td>A function to set the selection panel's title, will be called with an array of selected values, i.e. [{key, value}, ..]</td>
            <td></td>
        </tr>
        <tr>
            <td>getStaticText</td>
            <td></td>
            <td>Function</td>
            <td>A function to set the static text (not in selection panel), will be called with an array of selected values</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Events/Callbacks

- `onOpen(selectedValues)`

	Will be called when the selection panel shows up with current selected values.

- `onClose(selectedValues)`

	Will be called when the selection panel hides with current selected values. Called after `onConfirm` and `onCancel`.

- `onConfirm(selectedValues)`

	Will be called when the confirm button or backdrop is clicked with current selected values.

- `onCancel(selectedValues)`

	Will be called when the cancel button is clicked with current selected values.

- `onDidSelect(index, selectedValue)`

	Will be called when scrolling stops, useful for real-time selection. `index` is the index of scrolling column and `selectedValue` is the newly selected element.

- `onSelect(index, selectedValue)`

	Will be called when scrolling and selected value is changed, useful for playing sound effects or so. `index` is the index of scrolling column and `selectedValue` is the newly selected element.

## Getter

- `selectedValues`

	Get the current array of selected values, each element contains a `key` and a `value`. Remember to attach `ref` to `<UltraSelect>`.

	```js
	this.refs.ultraSelect.selectedValues
	```

## Examples

- Online

	Open \<https://swenyang.github.io/react-ultra-select\> to see online demo.

- Local

	Clone this repo, and run `npm run examples`. Then navigate to \<http://localhost:8080\> to see examples.

## TODO

- `div-scroll` branch

	1. Smoother scrolling experience with `div` scrolling event
	2. Hide vertical scroll bars in non-webkit browsers such as Firefox/IE/Opera etc.

- Transitions

	Add some smooth transitions for backdrop and columns showing up and hiding.

- Compatibilities & Optimizations


