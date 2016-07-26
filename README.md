# React Ultra Select
A good substitution for HTML `select` and `option` tags on mobile platforms, based on React.

Basically React Ultra Select works like the `select` and `option` of INPUT element in HTML, however, it accepts groups of data and provides event callbacks for implementing more powerful features. Very handy.

## Features
- **Compatible**

    Works fine on all platforms, no matter iOS, Android or Desktop browsers.

- **Dynamic**

	You can pass `N` groups of data to React Ultra Select. It will handle data automatically and divide into `N` columns respectively.

	Also, you can customize the number visible rows and the height of each row, pass images or any React node as an selection other than a string.

- **Extensible**

	Emits 6 types of events for composing more powerful components.

	For example, I write a [React Date Picker][2] based on this component. It's much more complicated.

- **iOS like**

	Totally iOS like, except the filters and the loop(haven't found a solution yet).

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
            <td>`7`</td>
            <td>Odd Number</td>
            <td>Visible rows at one time</td>
            <td>`3`, `5`, `7`, `9` etc.</td>
        </tr>
        <tr>
            <td>rowHeight</td>
            <td>`25`</td>
            <td>Number</td>
            <td>Height for each row</td>
            <td></td>
        </tr>
        <tr>
            <td>`rowHeightUnit`</td>
            <td>`px`</td>
            <td>String</td>
            <td>Height unit for each row, works with `rowHeight`</td>
            <td>`px`, `em`, `rem` etc.</td>
        </tr>
        <tr>
            <td>`backdrop`</td>
            <td>`true`</td>
            <td>Boolean</td>
            <td>Whether to show backdrop or not</td>
            <td></td>
        </tr>
        <tr>
            <td>`confirmButton`</td>
            <td>`'Confirm'`</td>
            <td>String or React Node</td>
            <td>Used to customize the confirm button label</td>
            <td></td>
        </tr>
        <tr>
            <td>`cancelButton`</td>
            <td>`'Cancel'`</td>
            <td>String or React Node</td>
            <td>Used to customize the cancel button label</td>
            <td></td>
        </tr>
        <tr>
            <td>`disabled`</td>
            <td>`false`</td>
            <td>Boolean</td>
            <td>Disable selection panel or not</td>
            <td></td>
        </tr>
        <tr>
            <td>`useTouchTap`</td>
            <td>`false`</td>
            <td>Boolean</td>
            <td>Use `onTouchTap` event instead of `onClick` to work with [react-tap-event-plugin][4]</td>
            <td></td>
        </tr>
        <tr>
            <td>`isOpen`</td>
            <td>`null`</td>
            <td>Boolean or `null`</td>
            <td>Whether the columns shows up or not</td>
            <td></td>
        </tr>
        <tr>
            <td>`getTitle`</td>
            <td></td>
            <td>Function</td>
            <td>A function to set the selection panel's title, will be called with an array of selected values, i.e. `(key, value)`</td>
            <td></td>
        </tr>
        <tr>
            <td>`getStaticText`</td>
            <td></td>
            <td>Function</td>
            <td>A function to set the text in collapse state, will be called with an array of selected values</td>
            <td></td>
        </tr>
        <tr>
            <td>`onOpen`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called when the selection panel show up</td>
            <td></td>
        </tr>
        <tr>
            <td>`onClose`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called when the selection panel hide</td>
            <td></td>
        </tr>
        <tr>
            <td>`onConfirm`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called when the confirm button or backdrop is clicked</td>
            <td></td>
        </tr>
        <tr>
            <td>`onCancel`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called when the cancel button is clicked</td>
            <td></td>
        </tr>
        <tr>
            <td>`onDidSelect`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called when scrolling stops, useful for real-time selection</td>
            <td>`(index, selectedValue) => selectedValue.key`</td>
        </tr>
        <tr>
            <td>`onSelect`</td>
            <td></td>
            <td>Function</td>
            <td>Will be called when selected value is changed, useful for playing sound effects</td>
            <td>`(index, selectedValue) => selectedValue.key`</td>
        </tr>
    </tbody>
</table>

## Functions

- `UltraSelect.selectedValues`

    Get the current array of selected values, each element contains a `key` and a `value`.

    ```js
    this.refs.ultraSelect.selectedValues
    ```

## Examples
- Online

	Open <https://swenyang.github.io/react-ultra-select> to see online demo.

- Local

	Clone this repo, and run `npm run examples`. Then navigate to <http://localhost:8080> to see examples.

## TODO
- [x] Removing iscroll-probe

	React Ultra Select currently relies on [React IScroll][1] and [iscroll-probe][3], it's a bit too heavy. Should find a smaller solution for calculating selected indecies.

- Transitions

	Add some smooth transitions for backdrop and columns showing up and hiding.

- Optimizations

[1]: https://github.com/swenyang/react-iscroll
[2]: https://github.com/swenyang/react-date-picker
[3]: http://iscrolljs.com/
[4]: https://github.com/zilverline/react-tap-event-plugin