(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("iscroll-react"), require("iscroll/build/iscroll-probe"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "iscroll-react", "iscroll/build/iscroll-probe"], factory);
	else if(typeof exports === 'object')
		exports["react-ultra-select"] = factory(require("react"), require("react-dom"), require("iscroll-react"), require("iscroll/build/iscroll-probe"));
	else
		root["react-ultra-select"] = factory(root["react"], root["react-dom"], root["iscroll-react"], root["iscroll/build/iscroll-probe"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Portal = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _iscrollReact = __webpack_require__(4);

	var _iscrollReact2 = _interopRequireDefault(_iscrollReact);

	var _iscrollProbe = __webpack_require__(5);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _Portal = __webpack_require__(6);

	var _Portal2 = _interopRequireDefault(_Portal);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var positiveOddPropType = function positiveOddPropType(props, propName, componentName) {
	    var val = props[propName];
	    if (typeof val === 'number') {
	        if (val < 0) {
	            return new Error(componentName + ': ' + propName + ' should be passed a positive odd number.');
	        } else if (val % 2 === 0) {
	            return new Error(componentName + ': ' + propName + ' should be passed a positive odd number.');
	        }
	    } else {
	        return new Error(componentName + ': ' + propName + ' should be passed a positive odd number.');
	    }
	};

	function _pushEmptyElements(props) {
	    var selected = [];
	    var numEmpty = Math.floor(props.rowsVisible / 2);
	    for (var i = 0, l = props.columns.length; i < l; i++) {
	        var newList = [];
	        for (var j = 0; j < numEmpty; j++) {
	            newList.push({ key: '', value: '' });
	        }newList = newList.concat(props.columns[i].list);
	        for (var _j = 0; _j < numEmpty; _j++) {
	            newList.push({ key: '', value: '' });
	        }props.columns[i].list = newList;

	        var d = props.columns[i].defaultIndex || 0;
	        d += numEmpty;
	        var max = newList.length - Math.ceil(props.rowsVisible / 2);
	        if (d < numEmpty) d = numEmpty;
	        if (d > max) d = max;
	        selected.push(d);
	    }
	    return selected;
	}

	var UltraSelect = function (_Component) {
	    _inherits(UltraSelect, _Component);

	    function UltraSelect(props) {
	        _classCallCheck(this, UltraSelect);

	        var selected = _pushEmptyElements(props);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UltraSelect).call(this, props));

	        _this._selectedNew = false;

	        _this.onScroll = _this.onScroll.bind(_this);
	        _this.onScrollEnd = _this.onScrollEnd.bind(_this);
	        _this.onToggle = _this.onToggle.bind(_this);

	        var selectedValues = _this.getSelectedValues(props.columns, selected);
	        _this.state = {
	            selected: selected,
	            title: _this.getTitle(selectedValues),
	            staticText: _this.getStaticText(selectedValues),
	            open: false
	        };
	        return _this;
	    }

	    _createClass(UltraSelect, [{
	        key: 'getSelectedValues',
	        value: function getSelectedValues(columns, selected) {
	            var ret = [];
	            for (var i = 0, l = columns.length; i < l; i++) {
	                ret.push(columns[i].list[selected[i]]);
	            }
	            return ret;
	        }
	    }, {
	        key: 'getTitle',
	        value: function getTitle(selectedValues) {
	            if (this.props.getTitle) {
	                return this.props.getTitle(selectedValues);
	            } else {
	                return this.concatArrStrings(selectedValues);
	            }
	        }
	    }, {
	        key: 'getStaticText',
	        value: function getStaticText(selectedValues) {
	            if (this.props.getStaticText) {
	                return this.props.getStaticText(selectedValues);
	            } else {
	                return this.concatArrStrings(selectedValues);
	            }
	        }
	    }, {
	        key: 'concatArrStrings',
	        value: function concatArrStrings(selectedValues) {
	            return _react2.default.createElement(
	                'span',
	                null,
	                selectedValues.map(function (e, i) {
	                    return _react2.default.createElement(
	                        'span',
	                        { key: i },
	                        i === 0 ? '' : '-',
	                        e.value
	                    );
	                })
	            );
	        }
	    }, {
	        key: 'calculateSelected',
	        value: function calculateSelected(offset, numCells, visibleCells, cellHeight, totalHeight) {
	            var start = Math.floor(visibleCells / 2);
	            var end = numCells - Math.ceil(visibleCells / 2);

	            if (offset >= 0) return start;
	            var maxOffset = visibleCells * cellHeight - totalHeight;
	            if (offset <= maxOffset) return end;

	            offset = Math.abs(offset);
	            var num = Math.round(offset / cellHeight);
	            return start + num;
	        }
	    }, {
	        key: 'findIScrollIndex',
	        value: function findIScrollIndex(instance) {
	            for (var i = 0, l = this.props.columns.length; i < l; i++) {
	                var _iScroll = this.refs['iscroll' + i];
	                if (_iScroll && _iScroll.iScrollInstance === instance) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'onScroll',
	        value: function onScroll(instance) {
	            //console.log(instance.y)
	            var index = this.findIScrollIndex(instance);
	            if (index === -1) return;
	            var elem = this.refs['elem' + index];
	            if (elem) {
	                var selectedBefore = this.state.selected[index];
	                var selectedNew = this.calculateSelected(instance.y, this.props.columns[index].list.length, this.props.rowsVisible, elem.clientHeight, instance.scrollerHeight);
	                if (selectedBefore !== selectedNew) {
	                    //console.log("select new index", selectedNew, selectedBefore)
	                    var selected = [].concat(_toConsumableArray(this.state.selected));
	                    selected[index] = selectedNew;
	                    var selectedValues = this.getSelectedValues(this.props.columns, selected);
	                    this.setState(_extends({}, this.state, {
	                        selected: selected,
	                        title: this.getTitle(selectedValues),
	                        staticText: this.getStaticText(selectedValues)
	                    }));
	                    this._selectedNew = true;
	                    if (this.props.onSelect) {
	                        this.props.onSelect(index, selectedValues[index]);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'onScrollEnd',
	        value: function onScrollEnd(instance) {
	            var index = this.findIScrollIndex(instance);
	            var elem = this.refs['elem' + index];
	            if (elem) {
	                if (this._selectedNew) {
	                    this._selectedNew = false;
	                    var selectedValues = this.getSelectedValues(this.props.columns, this.state.selected);
	                    if (this.props.onDidSelect) {
	                        this.props.onDidSelect(index, selectedValues[index]);
	                    }
	                }

	                // incase instance bounce back on top/bottom
	                if (instance.y >= 0) return;
	                var maxOffset = this.props.rowsVisible * elem.clientHeight - instance.scrollerHeight;
	                if (instance.y <= maxOffset) return;

	                instance.scrollTo(0, -(this.state.selected[index] - Math.floor(this.props.rowsVisible / 2)) * elem.clientHeight, 0);
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.scrollToSelected();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var selected = _pushEmptyElements(nextProps);
	            var selectedValues = this.getSelectedValues(nextProps.columns, selected);
	            this.setState(_extends({}, this.state, {
	                selected: selected,
	                title: this.getTitle(selectedValues),
	                staticText: this.getStaticText(selectedValues)
	            }));
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            var _this2 = this;

	            // use setTimeout(func, 0) to fix async data bugs
	            setTimeout(function () {
	                for (var i = 0, l = _this2.props.columns.length; i < l; i++) {
	                    var iscroll = _this2.refs['iscroll' + i];
	                    if (iscroll) {
	                        iscroll.updateIScroll();
	                    }
	                }
	                _this2.scrollToSelected();
	            }, 0);
	        }
	    }, {
	        key: 'scrollToSelected',
	        value: function scrollToSelected() {
	            for (var i = 0, l = this.props.columns.length; i < l; i++) {
	                var elem = this.refs['elem' + i];
	                if (!elem) return;
	                this.refs['iscroll' + i].iScrollInstance.scrollTo(0, -(this.state.selected[i] - Math.floor(this.props.rowsVisible / 2)) * elem.clientHeight, 0);
	            }
	        }
	    }, {
	        key: 'getElemClass',
	        value: function getElemClass(elemIndex, columnIndex) {
	            var distance = Math.abs(elemIndex - this.state.selected[columnIndex]);
	            switch (distance) {
	                case 0:
	                    return 'elem-level-1';
	                case 1:
	                    return 'elem-level-2';
	                case 2:
	                    return 'elem-level-3';
	                default:
	                    return 'elem-level-4';
	            }
	        }
	    }, {
	        key: 'onToggle',
	        value: function onToggle(e) {
	            e.preventDefault();
	            if (!this.state.open && this.props.disabled) {
	                return;
	            }
	            this.setState(_extends({}, this.state, {
	                open: !this.state.open
	            }));
	        }
	    }, {
	        key: 'renderStatic',
	        value: function renderStatic() {
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'react-ultra-selector-static', onTouchTap: this.onToggle, style: { background: this.props.disabled ? '#eee' : '#fff' } },
	                    this.state.staticText
	                );
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'react-ultra-selector-static', onClick: this.onToggle, style: { background: this.props.disabled ? '#eee' : '#fff' } },
	                this.state.staticText
	            );
	        }
	    }, {
	        key: 'renderBackdrop',
	        value: function renderBackdrop() {
	            if (!this.props.backdrop) return null;
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement('div', { className: 'backdrop', onTouchTap: this.onToggle });
	            }
	            return _react2.default.createElement('div', { className: 'backdrop', onClick: this.onToggle });
	        }
	    }, {
	        key: 'renderConfirm',
	        value: function renderConfirm() {
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement(
	                    'a',
	                    { className: 'confirm', href: '#', onTouchTap: this.onToggle },
	                    this.props.confirmButton
	                );
	            }
	            return _react2.default.createElement(
	                'a',
	                { className: 'confirm', href: '#', onClick: this.onToggle },
	                this.props.confirmButton
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            if (!this.state.open) {
	                return this.renderStatic();
	            }

	            var listHeight = '' + this.props.rowHeight * this.props.rowsVisible + this.props.rowHeightUnit;
	            var rowHeight = '' + this.props.rowHeight + this.props.rowHeightUnit;
	            var separatorTop = '' + this.props.rowHeight * Math.floor(this.props.rowsVisible / 2) + this.props.rowHeightUnit;

	            return _react2.default.createElement(
	                'span',
	                null,
	                this.renderStatic(),
	                _react2.default.createElement(
	                    _Portal2.default,
	                    null,
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'react-ultra-selector' },
	                        this.renderBackdrop(),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'caption', style: { bottom: listHeight, height: rowHeight, lineHeight: rowHeight } },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'title' },
	                                this.state.title
	                            ),
	                            this.renderConfirm()
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'columns', style: { height: listHeight } },
	                            _react2.default.createElement(
	                                'table',
	                                null,
	                                _react2.default.createElement(
	                                    'tbody',
	                                    null,
	                                    _react2.default.createElement(
	                                        'tr',
	                                        null,
	                                        this.props.columns.map(function (elem, index) {
	                                            return _react2.default.createElement(
	                                                'td',
	                                                { key: index },
	                                                _react2.default.createElement(
	                                                    _iscrollReact2.default,
	                                                    { ref: 'iscroll' + index, iScroll: _iscrollProbe2.default, options: { mouseWheel: true, probeType: 3, bindToWrapper: true }, onScroll: _this3.onScroll, onScrollEnd: _this3.onScrollEnd },
	                                                    elem.list.map(function (e, i) {
	                                                        return _react2.default.createElement(
	                                                            'div',
	                                                            { className: 'elem ' + _this3.getElemClass(i, index), key: i, ref: 'elem' + i,
	                                                                style: { height: rowHeight, lineHeight: rowHeight } },
	                                                            e.value
	                                                        );
	                                                    })
	                                                )
	                                            );
	                                        })
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement('div', { className: 'separator', style: { top: separatorTop, height: rowHeight } })
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'selectedValues',
	        get: function get() {
	            return this.getSelectedValues(this.props.columns, this.state.selected);
	        }
	    }]);

	    return UltraSelect;
	}(_react.Component);

	UltraSelect.propTypes = {
	    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	        list: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	            key: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]).isRequired,
	            value: _react.PropTypes.node.isRequired
	        })).isRequired,
	        defaultIndex: _react.PropTypes.number
	    })).isRequired,
	    rowsVisible: positiveOddPropType,
	    rowHeight: _react.PropTypes.number,
	    rowHeightUnit: _react.PropTypes.string,
	    backdrop: _react.PropTypes.bool,
	    getTitle: _react.PropTypes.func,
	    getStaticText: _react.PropTypes.func,
	    confirmButton: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	    onDidSelect: _react.PropTypes.func,
	    onSelect: _react.PropTypes.func,
	    disabled: _react.PropTypes.bool,
	    useTouchTap: _react.PropTypes.bool
	};
	UltraSelect.defaultProps = {
	    rowsVisible: 7,
	    rowHeight: 25,
	    rowHeightUnit: 'px',
	    backdrop: true,
	    confirmButton: 'CONFIRM',
	    disabled: false,
	    useTouchTap: false
	};
	exports.default = UltraSelect;
	var Portal = exports.Portal = _Portal2.default;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var totalSerial = 1;

	// a simple portal referenced from
	// http://stackoverflow.com/questions/28802179/how-to-create-a-react-modalwhich-is-append-to-body-with-transitions

	var Portal = function (_Component) {
	    _inherits(Portal, _Component);

	    function Portal(props) {
	        _classCallCheck(this, Portal);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Portal).call(this, props));

	        _this._serial = totalSerial++;
	        return _this;
	    }

	    _createClass(Portal, [{
	        key: 'render',
	        value: function render() {
	            return null;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var id = this.props.portalId || 'portal' + this._serial;
	            var p = document.getElementById(id);
	            if (!p) {
	                var p = document.createElement('div');
	                p.id = id;
	                document.body.appendChild(p);
	            }
	            this._portalElement = p;
	            this.componentDidUpdate();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            document.body.removeChild(this._portalElement);
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            _reactDom2.default.render(_react2.default.createElement(
	                'div',
	                this.props,
	                this.props.children
	            ), this._portalElement);
	        }
	    }]);

	    return Portal;
	}(_react.Component);

	Portal.propTypes = {
	    portalId: _react.PropTypes.string
	};
	exports.default = Portal;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./UltraSelect.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./UltraSelect.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".react-ultra-selector-static {\n  border-radius: 8px;\n  border: 1px solid #ddd;\n  padding: 5px 1.4em 5px 0.6em;\n  display: inline-block;\n  position: relative;\n}\n.react-ultra-selector-static:after {\n  content: '';\n  position: absolute;\n  border-color: #007aff;\n  border-style: solid;\n  border-width: 0 2px 2px 0;\n  height: 0.5em;\n  width: 0.5em;\n  right: 0.4em;\n  bottom: 40%;\n  transform: rotate(45deg);\n}\n.react-ultra-selector {\n  display: inline;\n}\n.react-ultra-selector .backdrop {\n  position: fixed;\n  background-color: #000;\n  opacity: 0.5;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.react-ultra-selector .caption {\n  position: fixed;\n  background-color: #fff;\n  width: 100%;\n  border-top: 1px solid #ddd;\n  padding: 5px 0;\n  display: table;\n  left: 0;\n}\n.react-ultra-selector .caption .title {\n  text-align: center;\n  display: table-cell;\n  vertical-align: middle;\n}\n.react-ultra-selector .caption .confirm {\n  display: table-cell;\n  padding: 0 10px;\n  background-color: #fff;\n  border-left: 1px solid #ddd;\n  vertical-align: middle;\n  white-space: nowrap;\n  width: 1%;\n}\n.react-ultra-selector .caption a,\n.react-ultra-selector .caption a:hover,\n.react-ultra-selector .caption a:active,\n.react-ultra-selector .caption a:visited {\n  text-decoration: none;\n}\n.react-ultra-selector .columns {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  overflow: scroll;\n  background-color: #fff;\n  text-align: center;\n}\n.react-ultra-selector .columns table {\n  width: 100%;\n  height: 100%;\n  background-color: #eee;\n}\n.react-ultra-selector .columns table td {\n  position: relative;\n}\n.react-ultra-selector .columns .elem {\n  color: #999;\n  overflow: hidden;\n}\n.react-ultra-selector .columns .elem-level-1 {\n  color: #000;\n  font-weight: bold;\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  -o-transform: scale(1);\n  transform: scale(1);\n}\n.react-ultra-selector .columns .elem-level-2 {\n  -webkit-transform: scale(0.9) rotateX(15deg);\n  -ms-transform: scale(0.9) rotateX(15deg);\n  -o-transform: scale(0.9) rotateX(15deg);\n  transform: scale(0.9) rotateX(15deg);\n}\n.react-ultra-selector .columns .elem-level-3 {\n  -webkit-transform: scale(0.8) rotateX(30deg);\n  -ms-transform: scale(0.8) rotateX(30deg);\n  -o-transform: scale(0.8) rotateX(30deg);\n  transform: scale(0.8) rotateX(30deg);\n}\n.react-ultra-selector .columns .elem-level-4 {\n  -webkit-transform: scale(0.7) rotateX(45deg);\n  -ms-transform: scale(0.7) rotateX(45deg);\n  -o-transform: scale(0.7) rotateX(45deg);\n  transform: scale(0.7) rotateX(45deg);\n}\n.react-ultra-selector .separator {\n  position: absolute;\n  pointer-events: none;\n  width: 100%;\n  border-top: 1px solid #ddd;\n  border-bottom: 1px solid #ddd;\n}\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;