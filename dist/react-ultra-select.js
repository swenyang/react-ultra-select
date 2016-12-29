(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("iscroll-react"), require("iscroll/build/iscroll-probe"), require("deep-equal"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "iscroll-react", "iscroll/build/iscroll-probe", "deep-equal", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["react-ultra-select"] = factory(require("react"), require("iscroll-react"), require("iscroll/build/iscroll-probe"), require("deep-equal"), require("react-dom"));
	else
		root["react-ultra-select"] = factory(root["react"], root["iscroll-react"], root["iscroll/build/iscroll-probe"], root["deep-equal"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _iscrollReact = __webpack_require__(3);

	var _iscrollReact2 = _interopRequireDefault(_iscrollReact);

	var _iscrollProbe = __webpack_require__(4);

	var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

	var _deepEqual = __webpack_require__(5);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _Portal = __webpack_require__(6);

	var _Portal2 = _interopRequireDefault(_Portal);

	__webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var positiveOddPropType = function positiveOddPropType(props, propName, componentName) {
	    var val = props[propName];
	    if (typeof val === 'number' && val > 0 && val % 2 !== 0) {
	        return null;
	    }
	    return new Error(componentName + ': ' + propName + ' should be passed a positive odd number.');
	};

	var pushEmptyElements = function pushEmptyElements(props) {
	    var selected = [];
	    var numEmpty = Math.floor(props.rowsVisible / 2);
	    var columns = [];
	    for (var i = 0, l = props.columns.length; i < l; i++) {
	        // push several empty elements before & after for each column
	        var newList = [];
	        for (var j = 0; j < numEmpty; j++) {
	            newList.push({
	                key: '',
	                value: ''
	            });
	        }
	        newList = newList.concat(props.columns[i].list);
	        for (var _j = 0; _j < numEmpty; _j++) {
	            newList.push({
	                key: '',
	                value: ''
	            });
	        }

	        // calculate selected index
	        var index = props.columns[i].defaultIndex || 0;
	        index += numEmpty;
	        var max = newList.length - Math.ceil(props.rowsVisible / 2);
	        if (index < numEmpty) index = numEmpty;
	        if (index > max) index = max;
	        columns.push({
	            list: newList
	        });
	        selected.push(index);
	    }
	    return [selected, columns];
	};

	var UltraSelect = function (_Component) {
	    _inherits(UltraSelect, _Component);

	    function UltraSelect(props) {
	        _classCallCheck(this, UltraSelect);

	        var _pushEmptyElements = pushEmptyElements(props);

	        var _pushEmptyElements2 = _slicedToArray(_pushEmptyElements, 2);

	        var selected = _pushEmptyElements2[0];
	        var columns = _pushEmptyElements2[1];

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UltraSelect).call(this, props));

	        _this.onScroll = _this.onScroll.bind(_this);
	        _this.onScrollEnd = _this.onScrollEnd.bind(_this);
	        _this.onToggle = _this.onToggle.bind(_this);
	        _this.onCancel = _this.onCancel.bind(_this);
	        _this.onConfirm = _this.onConfirm.bind(_this);
	        _this.onTouchBackdrop = _this.onTouchBackdrop.bind(_this);

	        var selectedValues = _this.getSelectedValues(columns, selected);
	        _this.state = {
	            selected: selected,
	            title: _this.getTitle(selectedValues),
	            staticText: _this.getStaticText(selectedValues),
	            open: _this.props.isOpen,
	            columns: columns
	        };
	        if (_this.props.isOpen) {
	            _this.setBodyOverflow('hidden');
	        }
	        return _this;
	    }

	    _createClass(UltraSelect, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // incase mount with isOpen=true
	            this.scrollToSelected();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _pushEmptyElements3 = pushEmptyElements(nextProps);

	            var _pushEmptyElements4 = _slicedToArray(_pushEmptyElements3, 2);

	            var selected = _pushEmptyElements4[0];
	            var columns = _pushEmptyElements4[1];

	            var selectedValues = this.getSelectedValues(columns, selected);
	            var newState = _extends({}, this.state, {
	                selected: selected,
	                title: this.getTitle(selectedValues),
	                // staticText: this.getStaticText(selectedValues),
	                columns: columns,
	                open: nextProps.isOpen == null ? this.state.open : nextProps.isOpen
	            });
	            if (newState.open) {
	                this.mSelectedOnOpen = selected;
	            } else {
	                newState.staticText = this.getStaticText(selectedValues);
	            }
	            this.setState(newState);
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (Object.keys(this.props).length !== Object.keys(nextProps).length) {
	                return true;
	            }
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(nextProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    if (key === 'columns') {
	                        if (!(0, _deepEqual2.default)(nextProps.columns, this.props.columns)) {
	                            return true;
	                        }
	                    } else if (!key.startsWith('on') && nextProps[key] !== this.props[key]) {
	                        return true;
	                    }
	                }
	                // console.log('equal props')
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            if (Object.keys(this.state).length !== Object.keys(nextState).length) {
	                return true;
	            }
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = Object.keys(nextState)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _key = _step2.value;

	                    if (_key === 'title' || _key === 'staticText') {
	                        // ignore title/staticText because they are changed by columns & selected
	                    } else if (_key === 'selected' || _key === 'columns') {
	                            if (!(0, _deepEqual2.default)(nextState[_key], this.state[_key])) {
	                                return true;
	                            }
	                        } else if (nextState[_key] !== this.state[_key]) {
	                            return true;
	                        }
	                }
	                // console.log('no need to update')
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            return false;
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            var _this2 = this;

	            // use setTimeout(func, 0) to fix async data bugs
	            setTimeout(function () {
	                for (var i = 0, l = _this2.state.columns.length; i < l; i++) {
	                    var column = _this2.refs['column' + i];
	                    if (column) {
	                        column.updateIScroll();
	                    }
	                }
	                _this2.scrollToSelected();
	            }, 0);
	        }
	    }, {
	        key: 'onScrollEnd',
	        value: function onScrollEnd(instance) {
	            var index = this.findColumnIndex(instance);
	            var elem = this.refs.elem;

	            if (elem) {
	                if (this.mSelectedNew) {
	                    this.mSelectedNew = false;
	                    var selectedValues = this.getSelectedValues(this.state.columns, this.state.selected);
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
	        key: 'onScroll',
	        value: function onScroll(instance) {
	            // console.log(instance.y)
	            var index = this.findColumnIndex(instance);
	            if (index === -1) return;
	            var elem = this.refs.elem;

	            if (elem) {
	                var selectedOld = this.state.selected[index];
	                var selectedNew = this.calculateSelected(instance.y, this.state.columns[index].list.length, this.props.rowsVisible, elem.clientHeight, instance.scrollerHeight);
	                if (selectedOld !== selectedNew) {
	                    // console.log("select new index", selectedNew, selectedOld)
	                    var selected = [].concat(_toConsumableArray(this.state.selected));
	                    selected[index] = selectedNew;
	                    var selectedValues = this.getSelectedValues(this.state.columns, selected);
	                    this.setState(_extends({}, this.state, {
	                        selected: selected,
	                        title: this.getTitle(selectedValues)
	                    }));
	                    //staticText: this.getStaticText(selectedValues),
	                    this.mSelectedNew = true;
	                    if (this.props.onSelect) {
	                        this.props.onSelect(index, selectedValues[index]);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'onToggle',
	        value: function onToggle() {
	            var isCancel = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	            if (!this.state.open && this.props.disabled) {
	                return;
	            }
	            if (!this.state.open) {
	                if (this.props.backdrop) {
	                    this.setBodyOverflow('hidden');
	                }
	                if (this.props.onOpen) {
	                    this.props.onOpen(this.selectedValues);
	                }
	                this.mSelectedOnOpen = this.state.selected;
	                this.setState(_extends({}, this.state, {
	                    open: true
	                }));
	            } else {
	                if (this.props.backdrop) {
	                    this.setBodyOverflow(null);
	                }
	                if (this.props.onClose) {
	                    this.props.onClose(this.selectedValues);
	                }
	                if (isCancel === true) {
	                    // if cancel selection, revert state
	                    var selectedOnOpen = this.mSelectedOnOpen || this.state.selected;
	                    var selectedValues = this.getSelectedValues(this.state.columns, selectedOnOpen);
	                    this.setState(_extends({}, this.state, {
	                        open: false,
	                        selected: selectedOnOpen,
	                        title: this.getTitle(selectedValues),
	                        staticText: this.getStaticText(selectedValues)
	                    }));
	                } else {
	                    // if confirm selection, update static text
	                    var _selectedValues = this.getSelectedValues(this.state.columns, this.state.selected);
	                    this.setState(_extends({}, this.state, {
	                        open: !this.state.open,
	                        title: this.getTitle(_selectedValues),
	                        staticText: this.getStaticText(_selectedValues)
	                    }));
	                }
	            }
	        }
	    }, {
	        key: 'onTouchBackdrop',
	        value: function onTouchBackdrop() {
	            switch (this.props.backdropAction) {
	                case 'confirm':
	                    this.onConfirm();
	                    break;
	                case 'cancel':
	                    this.onCancel();
	                    break;
	                default:
	                    break;
	            }
	        }
	    }, {
	        key: 'onBlockEvents',
	        value: function onBlockEvents(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'onConfirm',
	        value: function onConfirm() {
	            var _this3 = this;

	            if (this.props.onConfirm) {
	                this.props.onConfirm(this.selectedValues);
	            }
	            setTimeout(function () {
	                return _this3.onToggle();
	            }, 0);
	        }
	    }, {
	        key: 'onCancel',
	        value: function onCancel() {
	            var _this4 = this;

	            if (this.props.disableCancel) {
	                return;
	            }
	            if (this.props.onCancel) {
	                this.props.onCancel(this.selectedValues);
	            }
	            setTimeout(function () {
	                return _this4.onToggle(true);
	            }, 0);
	        }
	    }, {
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
	            }
	            return null;
	            // return this.concatArrStrings(selectedValues)
	        }
	    }, {
	        key: 'getStaticText',
	        value: function getStaticText(selectedValues) {
	            if (this.props.getStaticText) {
	                return this.props.getStaticText(selectedValues);
	            }
	            return this.concatArrStrings(selectedValues);
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
	        key: 'setBodyOverflow',
	        value: function setBodyOverflow(overflow) {
	            /* global document */
	            document.body.style.overflow = overflow;
	        }
	    }, {
	        key: 'calculateSelected',
	        value: function calculateSelected(offset, numCells, visibleCells, cellHeight, totalHeight) {
	            var start = Math.floor(visibleCells / 2);
	            var end = numCells - Math.ceil(visibleCells / 2);

	            if (offset >= 0) return start;
	            var maxOffset = visibleCells * cellHeight - totalHeight;
	            if (offset <= maxOffset) return end;

	            return start + Math.round(Math.abs(offset) / cellHeight);
	        }
	    }, {
	        key: 'findColumnIndex',
	        value: function findColumnIndex(instance) {
	            for (var i = 0, l = this.state.columns.length; i < l; i++) {
	                var column = this.refs['column' + i];
	                if (column && column.iScrollInstance === instance) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }, {
	        key: 'scrollToSelected',
	        value: function scrollToSelected() {
	            for (var i = 0, l = this.state.columns.length; i < l; i++) {
	                var elem = this.refs.elem;

	                if (!elem) return;
	                var column = this.refs['column' + i];
	                if (column) {
	                    column.iScrollInstance.scrollTo(0, -(this.state.selected[i] - Math.floor(this.props.rowsVisible / 2)) * elem.clientHeight, 0);
	                }
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

	        // store the selected on open selection panel

	    }, {
	        key: 'renderStatic',
	        value: function renderStatic() {
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement(
	                    'div',
	                    {
	                        className: 'react-ultra-selector-static',
	                        onTouchTap: this.onToggle,
	                        style: { background: this.props.disabled ? '#eee' : '#fff' }
	                    },
	                    this.state.staticText
	                );
	            }
	            return _react2.default.createElement(
	                'div',
	                {
	                    className: 'react-ultra-selector-static',
	                    onClick: this.onToggle,
	                    style: { background: this.props.disabled ? '#eee' : '#fff' }
	                },
	                this.state.staticText
	            );
	        }
	    }, {
	        key: 'renderBackdrop',
	        value: function renderBackdrop() {
	            if (!this.props.backdrop) return null;
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement('div', {
	                    className: 'backdrop',
	                    onTouchTap: this.onTouchBackdrop,
	                    onTouchMove: this.onBlockEvents
	                });
	            }
	            return _react2.default.createElement('div', {
	                className: 'backdrop',
	                onClick: this.onTouchBackdrop,
	                onTouchMove: this.onBlockEvents
	            });
	        }
	    }, {
	        key: 'renderCancel',
	        value: function renderCancel() {
	            var style = {
	                visibility: this.props.disableCancel ? 'hidden' : 'visible'
	            };
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement(
	                    'a',
	                    { className: 'cancel', style: style, onTouchTap: this.onCancel },
	                    this.props.cancelButton
	                );
	            }
	            return _react2.default.createElement(
	                'a',
	                { className: 'cancel', style: style, onClick: this.onCancel },
	                this.props.cancelButton
	            );
	        }
	    }, {
	        key: 'renderConfirm',
	        value: function renderConfirm() {
	            if (this.props.useTouchTap) {
	                return _react2.default.createElement(
	                    'a',
	                    { className: 'confirm', onTouchTap: this.onConfirm },
	                    this.props.confirmButton
	                );
	            }
	            return _react2.default.createElement(
	                'a',
	                { className: 'confirm', onClick: this.onConfirm },
	                this.props.confirmButton
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this5 = this;

	            if (!this.state.open) {
	                return this.renderStatic();
	            }

	            var listHeight = '' + this.props.rowHeight * this.props.rowsVisible + this.props.rowHeightUnit;
	            var rowHeight = '' + this.props.rowHeight + this.props.rowHeightUnit;
	            var titleHeight = this.props.titleHeight ? '' + this.props.titleHeight + this.props.titleHeightUnit : rowHeight;
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
	                            {
	                                className: 'caption',
	                                style: { bottom: listHeight, height: titleHeight, lineHeight: titleHeight },
	                                onTouchMove: this.onBlockEvents
	                            },
	                            this.renderCancel(),
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
	                                {
	                                    onTouchMove: this.onBlockEvents,
	                                    style: { width: '100%', height: '100%', backgroundColor: '#eee' }
	                                },
	                                _react2.default.createElement(
	                                    'tbody',
	                                    null,
	                                    _react2.default.createElement(
	                                        'tr',
	                                        null,
	                                        this.state.columns.map(function (elem, index) {
	                                            return _react2.default.createElement(
	                                                'td',
	                                                { key: index, style: { position: 'relative' } },
	                                                _react2.default.createElement(
	                                                    _iscrollReact2.default,
	                                                    {
	                                                        ref: 'column' + index, iScroll: _iscrollProbe2.default,
	                                                        options: { mouseWheel: true, probeType: 3, bindToWrapper: true },
	                                                        onScroll: _this5.onScroll, onScrollEnd: _this5.onScrollEnd
	                                                    },
	                                                    elem.list.map(function (e, i) {
	                                                        return _react2.default.createElement(
	                                                            'div',
	                                                            {
	                                                                className: 'elem ' + _this5.getElemClass(i, index), key: i,
	                                                                ref: index === 0 && i === 0 ? 'elem' : null,
	                                                                style: { height: rowHeight, lineHeight: rowHeight }
	                                                            },
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
	            return this.getSelectedValues(this.state.columns, this.state.selected);
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

	    // displaying
	    rowsVisible: positiveOddPropType,
	    rowHeight: _react.PropTypes.number,
	    rowHeightUnit: _react.PropTypes.string,
	    titleHeight: _react.PropTypes.number,
	    titleHeightUnit: _react.PropTypes.string,

	    backdrop: _react.PropTypes.bool,
	    backdropAction: _react.PropTypes.oneOf(['confirm', 'cancel', 'none']),
	    getTitle: _react.PropTypes.func,
	    getStaticText: _react.PropTypes.func,
	    confirmButton: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	    cancelButton: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
	    isOpen: _react.PropTypes.bool,
	    useTouchTap: _react.PropTypes.bool,

	    disabled: _react.PropTypes.bool,
	    disableCancel: _react.PropTypes.bool,

	    // events
	    onOpen: _react.PropTypes.func, // open selection panel
	    onClose: _react.PropTypes.func, // close selection panel
	    onConfirm: _react.PropTypes.func, // click confirm button or click backdrop
	    onCancel: _react.PropTypes.func, // click cancel button
	    // scroll up and down to select elements while select panel is open, good time for such as playing sound effects
	    onSelect: _react.PropTypes.func,
	    // stop scrolling up and down while select panel is open, useful for real-time selection
	    onDidSelect: _react.PropTypes.func
	};
	UltraSelect.defaultProps = {
	    rowsVisible: 5,
	    rowHeight: 25,
	    rowHeightUnit: 'px',
	    titleHeightUnit: 'px',
	    backdrop: true,
	    confirmButton: 'Confirm',
	    cancelButton: 'Cancel',
	    disabled: false,
	    disableCancel: false,
	    useTouchTap: false,
	    backdropAction: 'confirm'
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

	var _reactDom = __webpack_require__(7);

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

	        _this.mSerial = totalSerial++;
	        return _this;
	    }

	    _createClass(Portal, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            /* global document */
	            var id = this.props.portalId || 'portal' + this.mSerial;
	            var p = document.getElementById(id);
	            if (!p) {
	                p = document.createElement('div');
	                p.id = id;
	                document.body.appendChild(p);
	            }
	            this.mPortalElement = p;
	            this.componentDidUpdate();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            _reactDom2.default.render(_react2.default.createElement(
	                'div',
	                this.props,
	                this.props.children
	            ), this.mPortalElement);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            document.body.removeChild(this.mPortalElement);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return null;
	        }
	    }]);

	    return Portal;
	}(_react.Component);

	Portal.propTypes = {
	    portalId: _react.PropTypes.string,
	    children: _react.PropTypes.node
	};
	exports.default = Portal;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".react-ultra-selector-static {\n  border-radius: 8px;\n  border: 1px solid #ddd;\n  padding: 5px 1.4em 5px 0.6em;\n  display: inline-block;\n  position: relative;\n}\n.react-ultra-selector-static:after {\n  content: '';\n  position: absolute;\n  border-color: #007aff;\n  border-style: solid;\n  border-width: 0 2px 2px 0;\n  height: 0.5em;\n  width: 0.5em;\n  right: 0.4em;\n  bottom: 40%;\n  -webkit-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  -o-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n.react-ultra-selector {\n  display: inline;\n}\n.react-ultra-selector .backdrop {\n  position: fixed;\n  background-color: #000;\n  opacity: 0.5;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.react-ultra-selector .caption {\n  position: fixed;\n  background-color: #fff;\n  width: 100%;\n  border-top: 1px solid #ddd;\n  padding: 5px 0;\n  display: table;\n  left: 0;\n}\n.react-ultra-selector .caption .title {\n  text-align: center;\n  display: table-cell;\n  vertical-align: middle;\n  width: 100%;\n}\n.react-ultra-selector .caption .cancel {\n  padding: 0 15px;\n  background-color: #fff;\n  white-space: nowrap;\n  display: table-cell;\n  vertical-align: middle;\n}\n.react-ultra-selector .caption .confirm {\n  padding: 0 15px;\n  background-color: #fff;\n  white-space: nowrap;\n  display: table-cell;\n  vertical-align: middle;\n}\n.react-ultra-selector .caption a,\n.react-ultra-selector .caption a:hover,\n.react-ultra-selector .caption a:active,\n.react-ultra-selector .caption a:visited {\n  text-decoration: none;\n}\n.react-ultra-selector .columns {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  background-color: #eee;\n}\n.react-ultra-selector .columns .elem {\n  color: #999;\n  overflow: hidden;\n}\n.react-ultra-selector .columns .elem-level-1 {\n  color: #000;\n  font-weight: bold;\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  -o-transform: scale(1);\n  transform: scale(1);\n}\n.react-ultra-selector .columns .elem-level-2 {\n  -webkit-transform: scale(0.9) rotateX(15deg);\n  -ms-transform: scale(0.9) rotateX(15deg);\n  -o-transform: scale(0.9) rotateX(15deg);\n  transform: scale(0.9) rotateX(15deg);\n}\n.react-ultra-selector .columns .elem-level-3 {\n  -webkit-transform: scale(0.8) rotateX(30deg);\n  -ms-transform: scale(0.8) rotateX(30deg);\n  -o-transform: scale(0.8) rotateX(30deg);\n  transform: scale(0.8) rotateX(30deg);\n}\n.react-ultra-selector .columns .elem-level-4 {\n  -webkit-transform: scale(0.7) rotateX(45deg);\n  -ms-transform: scale(0.7) rotateX(45deg);\n  -o-transform: scale(0.7) rotateX(45deg);\n  transform: scale(0.7) rotateX(45deg);\n}\n.react-ultra-selector .separator {\n  position: absolute;\n  pointer-events: none;\n  width: 100%;\n  border-top: 1px solid #ddd;\n  border-bottom: 1px solid #ddd;\n}\n", ""]);

	// exports


/***/ },
/* 10 */
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
/* 11 */
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