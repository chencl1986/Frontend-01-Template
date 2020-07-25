/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./carousel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.js":
/*!*********************!*\
  !*** ./carousel.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // 普通组件\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel() {\n    _classCallCheck(this, Carousel);\n\n    // console.log('config', config);\n    // 存储Children\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n  }\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // this.attributes.set(name, value);\n      this[name] = value;\n    } // 通过appendChild，存储子组件\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"loop\",\n    value: function loop(root, children) {\n      var _this = this;\n\n      var position = 0;\n\n      var nextPic = function nextPic() {\n        var nextPosition = (position + 1) % _this.data.length;\n        var current = children[position];\n        var next = children[nextPosition];\n        current.style.transition = 'ease 0s';\n        next.style.transition = 'ease 0s';\n        current.style.transform = \"translateX(\".concat(-100 * position, \"%)\");\n        next.style.transform = \"translateX(\".concat(100 - 100 * nextPosition, \"%)\"); // 浏览器会自动合并量测CSS操作，因此需要用计时器等待下一帧的时候再执行。\n        // 也可以用requestAnimationFrame(requestAnimationFrame(() => {}))\n\n        setTimeout(function () {\n          current.style.transition = ''; // means use css rule: ease 1s\n\n          next.style.transition = ''; // 终止位置\n\n          current.style.transform = \"translateX(\".concat(-100 - 100 * position, \"%)\");\n          next.style.transform = \"translateX(\".concat(-100 * nextPosition, \"%)\");\n          position = nextPosition;\n        }, 16); // 暂停轮播，处理拖拽功能\n\n        setTimeout(nextPic, 3000);\n      }; // 暂停轮播，处理拖拽功能\n\n\n      setTimeout(nextPic, 3000);\n    }\n  }, {\n    key: \"drag\",\n    value: function drag(root, children) {\n      var _this2 = this;\n\n      var position = 0;\n      root.addEventListener('mousedown', function () {\n        var startX = event.clientX;\n        var nextPosition = (position + 1) % _this2.data.length;\n        var lastPosition = (position - 1 + _this2.data.length) % _this2.data.length;\n        var current = children[position];\n        var last = children[lastPosition];\n        var next = children[nextPosition];\n        current.style.transition = 'ease 0s';\n        last.style.transition = 'ease 0s';\n        next.style.transition = 'ease 0s';\n        current.style.transform = \"translateX(\".concat(-500 * position, \"px)\");\n        last.style.transform = \"translateX(\".concat(-500 - 500 * lastPosition, \"px)\");\n        next.style.transform = \"translateX(\".concat(500 - 500 * nextPosition, \"px)\");\n\n        var move = function move(event) {\n          // console.log(event.clientX - startX, event.clientY - startY);\n          current.style.transform = \"translateX(\".concat(event.clientX - startX - 500 * position, \"px)\");\n          last.style.transform = \"translateX(\".concat(event.clientX - startX - 500 - 500 * lastPosition, \"px)\");\n          next.style.transform = \"translateX(\".concat(event.clientX - startX + 500 - 500 * nextPosition, \"px)\");\n        };\n\n        var up = function up(event) {\n          var offset = 0;\n\n          if (event.clientX - startX > 250) {\n            offset = 1;\n          } else if (event.clientX - startX < -250) {\n            offset = -1;\n          }\n\n          current.style.transition = ''; // 打开transition\n\n          last.style.transition = '';\n          next.style.transition = '';\n          current.style.transform = \"translateX(\".concat(offset * 500 - 500 * position, \"px)\");\n          last.style.transform = \"translateX(\".concat(offset * 500 - 500 - 500 * lastPosition, \"px)\");\n          next.style.transform = \"translateX(\".concat(offset * 500 + 500 - 500 * nextPosition, \"px)\");\n          position = (position - offset + _this2.data.length) % _this2.data.length;\n          document.removeEventListener('mousemove', move);\n          document.removeEventListener('mouseup', up);\n        }; // document绑定的事件，在浏览器外部，如控制台中，也会继续触发\n\n\n        document.addEventListener('mousemove', move);\n        document.addEventListener('mouseup', up);\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var children = this.data.map(function (url) {\n        var element = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"img\", {\n          src: url\n        });\n        element.addEventListener('dragstart', function (event) {\n          return event.preventDefault();\n        });\n        return element;\n      });\n      var root = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n        \"class\": 'carousel'\n      }, children); // this.loop(root, children);\n\n      this.drag(root, children);\n      return root;\n    } // 当前节点插入将渲染到页面\n\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      this.slot = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", null);\n\n      var _iterator = _createForOfIteratorHelper(this.children),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var child = _step.value;\n          this.slot.appendChild(child);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      this.render().mountTo(parent);\n    }\n  }]);\n\n  return Carousel;\n}(); // https://reactjs.org/docs/introducing-jsx.html\n// 此时调用createElement的顺序为1.Child,2.Child,3.Child,4:Div\n// 在JSX中，组件树构建顺序是子元素->父元素\n\n\nvar component = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(Carousel, {\n  data: ['https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg', 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg', 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg', 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg']\n}); // 将组件及其子组件渲染到#root\n\ncomponent.mountTo(document.querySelector('#root'));\n\n//# sourceURL=webpack:///./carousel.js?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Wrapper, Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(Cls, attributes) {\n  // console.log(arguments); // 如果没有设置属性时，arguments[1]为null\n  var element;\n\n  if (typeof Cls === 'string') {\n    element = new Wrapper(Cls, {\n      // 此处传入Config\n      config: 'wrapperConfig'\n    });\n  } else {\n    element = new Cls({\n      // 此处传入Config\n      config: 'elementConfig'\n    });\n  } // 将attributes转移到obj上\n\n\n  for (var name in attributes) {\n    // 此处可以把attributes设置到obj中\n    element.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    // console.log(children);\n    // 将children挂载到obj\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        // 如果子元素为数组，即需要用map遍历时，需要递归遍历\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n        } else if (typeof child === 'string') {\n          child = new Text(child);\n        } // 如果不用appendChild方法，也可以直接push到children，这主要看设计者的思想\n        // element.children.push(child);\n\n\n        if (!Array.isArray(child)) {\n          element.appendChild(child);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return element;\n} // html组件\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type, config) {\n    _classCallCheck(this, Wrapper);\n\n    // console.log('config', config);\n    // 存储Children\n    this.children = []; // 创建一个DOM元素\n\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      // console.log(name, value);\n      // 在DOM元素上插入属性\n      if (name === 'style' && _typeof(value) === 'object') {\n        for (var prop in value) {\n          this.root.style[prop] = value[prop];\n        }\n      } else {\n        this.root.setAttribute(name, value);\n      }\n    } // 绑定事件\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"appendChild\",\n    // 通过appendChild，存储子组件\n    value: function appendChild(child) {\n      // children\n      // console.log(this.root);\n      // console.log(child);\n      this.children.push(child);\n    } // 当前节点插入将渲染到页面\n\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}(); // 文本组件\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ })

/******/ });