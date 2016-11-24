# React Ultra Select

## 简介

基于React的选择器组件，可作为移动平台的`select`和`option` HTML标签的替代。

基本上React Ultra Select功能类似`select`和`option` HTML标签，但是其支持多列选择、支持更多的事件回调，可以扩展更强的特性。非常实用。

1.0.x的版本使用[iScroll](http://iscrolljs.com/)来处理滑动，提供更顺畅的滑动体验，但是也会大幅增加文件的体积。
1.1.x的版本使用默认`div`的scroll事件来处理滑动，移除了对[iScroll](http://iscrolljs.com/)的依赖，但是选择元素非常多时滑动体验很差。**仍然处于开发阶段**。

## 特性

- **跨平台兼容**

	所有平台都能正常工作，表现一致：iOS, Android或者桌面浏览器。

- **动态数据**

	你可以传递多组数据，组件能够自动处理数据，把各组数据渲染为多列。

	你也可以定制选择器可见的行数、行高，或者传递除了字符串之外的选择数据，比如图片、ReactNode。

- **可扩展性**

	提供6种事件，可以在此基础上扩展功能更强的组件。比如[React Date Picker](https://github.com/swenyang/react-date-picker)就是基于此组件实现的。

## 如何使用

```  
npm i react-ultra-select --save
```

在你的项目中使用：
```  
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

### 必须的Props

- columns

	类型：Array
	描述：一组包含多列选择数据的数组，每个元素含有一个选择列表和选中的index。
	样例：

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

### 可选的Props

<table>
    <thead>
        <tr>
            <td><b>Prop名称</b></td>
            <td><b>默认值</b></td>
            <td><b>类型</b></td>
            <td><b>描述</b></td>
            <td><b>样例</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>rowsVisible</td>
            <td>5</td>
            <td>奇数</td>
            <td>选择面板可见行数</td>
            <td>3, 5, 7, 9 等</td>
        </tr>
        <tr>
            <td>rowHeight</td>
            <td>25</td>
            <td>Number</td>
            <td>行高</td>
            <td></td>
        </tr>
        <tr>
            <td>rowHeightUnit</td>
            <td>px</td>
            <td>String</td>
            <td>行高的单位，跟rowHeight一起工作</td>
            <td>px, em, rem 等</td>
        </tr>
        <tr>
            <td>backdrop</td>
            <td>true</td>
            <td>Boolean</td>
            <td>是否要显示背景遮罩</td>
            <td></td>
        </tr>
        <tr>
            <td>backdropAction</td>
            <td>'confirm'</td>
            <td>'confirm', 'cancel', 或 'none'</td>
            <td>点击背景遮罩的行为，比如confirm为点击行为同确定按钮</td>
            <td></td>
        </tr>
        <tr>
            <td>confirmButton</td>
            <td>'Confirm'</td>
            <td>String或React Node</td>
            <td>自定义确定按钮的文字或者直接用React Node</td>
            <td></td>
        </tr>
        <tr>
            <td>cancelButton</td>
            <td>'Cancel'</td>
            <td>String或React Node</td>
            <td>自定义取消按钮的文字或者直接用React Node </td>
            <td></td>
        </tr>
        <tr>
            <td>disabled</td>
            <td>false</td>
            <td>Boolean</td>
            <td>是否禁用选择</td>
            <td></td>
        </tr>
        <tr>
            <td>disableCancel</td>
            <td>false</td>
            <td>Boolean</td>
            <td>禁用取消按钮，并且让其不可见</td>
            <td></td>
        </tr>
        <tr>
            <td>useTouchTap</td>
            <td>false</td>
            <td>Boolean</td>
            <td>点击事件是否使用onTouchTap事件，而不是默认的onClick事件，需要引用[react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)</td>
            <td></td>
        </tr>
        <tr>
            <td>isOpen</td>
            <td>null</td>
            <td>Boolean或null</td>
            <td>是否默认弹出选择面板</td>
            <td></td>
        </tr>
        <tr>
            <td>getTitle</td>
            <td></td>
            <td>Function</td>
            <td>设定选择面板标题的函数，接受选择值的数组作为参数，即`[{key, value}, ..]`。</td>
            <td></td>
        </tr>
        <tr>
            <td>getStaticText</td>
            <td></td>
            <td>Function</td>
            <td>设定静态文本（非选择面板）的函数，接受选择值的数组作为参数。 </td>
            <td></td>
        </tr>
    </tbody>
</table>

## 事件回调

- `onOpen(selectedValues)`

    当选择面板弹出的时候会调用此函数（如果有），并且会带上当前选择的一组值。

- `onClose(selectedValues)`

    当选择面板关闭的时候会调用此函数（如果有），并且会带上当前选择的一组值。在`onConfirm`和`onCancel`事件之后调用。

- `onConfirm(selectedValues)`

    当选择点击确定按钮或者背景遮罩的时候会调用此函数（如果有），并且会带上当前选择的一组值。

- `onCancel(selectedValues)`

    当选择点击关闭按钮的时候会调用此函数（如果有），并且会带上当前选择的一组值。

- `onDidSelect(index, selectedValue)`

    选择面板打开时，用户进行滑动选择，当一次滑动停止（用户停止滑动）时会调用此函数，并带上当前列的选择值。`index`是用户滑动的列，`selectedValue `是此列新选中的值。

- `onSelect(index, selectedValue)`

    选择面板打开时，用户进行滑动选择，每次滑动到新的选项时会调用此函数，并带上当前列的选择值。`index`是用户滑动的列，`selectedValue `是此列新选中的值。

## Getter

- `selectedValues`

	获得当前选择的所有列的数据，每个元素都是一个object，包含一个`key`和一个`value`。要使用此getter需要附加`ref`到组件。

	```js
	this.refs.ultraSelect.selectedValues
	```

## 样例

- 在线

	打开[https://swenyang.github.io/react-ultra-select](https://swenyang.github.io/react-ultra-select)可以看在线的demo。

- 本地

	复制本仓库，`npm install`安装依赖，然后运行`npm run examples`。在浏览器打开[http://localhost:8080](http://localhost:8080)可以看到样例。

## TODO

- `div-scroll`分支

	1. 优化`div`的scroll事件，提供更顺畅的滑动体验
	2. 在非webkit浏览器（比如Firefox、IE、Opera等）中隐藏纵向的滚动条

- 过渡动画

	给背景遮罩、面板弹出隐藏添加一些过渡的效果。

- 兼容性和优化
