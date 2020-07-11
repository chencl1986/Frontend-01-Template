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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./foo.js":
/*!****************!*\
  !*** ./foo.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('foo7');\n\n//# sourceURL=webpack:///./foo.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _foo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foo */ \"./foo.js\");\n/* harmony import */ var _foo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_foo__WEBPACK_IMPORTED_MODULE_0__);\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// require('./foo');\n\n/* class Parent {\r\n  constructor(config) {\r\n    console.log('config', config);\r\n    this.children = [];\r\n    this.root = document.createElement('div');\r\n  }\r\n  // property\r\n  set class(v) {\r\n    console.log('Parent::class', v);\r\n  }\r\n  // property\r\n  set id(v) {\r\n    console.log('Parent::id', v);\r\n  }\r\n  // attribute\r\n  setAttribute(name, value) {\r\n    console.log(name, value);\r\n    this.root.setAttribute(name, value);\r\n  }\r\n  // children\r\n  appendChild(child) {\r\n    console.log('Parent::appendChild', child);\r\n    // child.mountTo(this.root);\r\n    this.children.push(child);\r\n  }\r\n  mountTo(parent) {\r\n    parent.appendChild(this.root);\r\n    for (const child of this.children) {\r\n      child.mountTo(this.root);\r\n    }\r\n  }\r\n} */\n\n/* class Child {\r\n  constructor(config) {\r\n    console.log('config', config);\r\n    this.children = [];\r\n    this.root = document.createElement('div');\r\n  }\r\n  // property\r\n  set class(v) {\r\n    console.log('Parent::class', v);\r\n  }\r\n  // property\r\n  set id(v) {\r\n    console.log('Parent::id', v);\r\n  }\r\n  // attribute\r\n  setAttribute(name, value) {\r\n    console.log(name, value);\r\n    this.root.setAttribute(name, value);\r\n  }\r\n  // children\r\n  appendChild(child) {\r\n    console.log('Parent::appendChild', child);\r\n    // child.mountTo(this.root);\r\n    this.children.push(child);\r\n  }\r\n  mountTo(parent) {\r\n    parent.appendChild(this.root);\r\n    for (const child of this.children) {\r\n      child.mountTo(this.root);\r\n    }\r\n  }\r\n} */\n\nvar Div = /*#__PURE__*/function () {\n  function Div(config) {\n    _classCallCheck(this, Div);\n\n    console.log('config', config);\n    this.children = [];\n    this.root = document.createElement('div');\n    this.attributes = new Map();\n    this.properties = new Map();\n  } // property\n\n\n  _createClass(Div, [{\n    key: \"setAttribute\",\n    // attribute\n    value: function setAttribute(name, value) {\n      console.log(name, value);\n      this.attributes.set(name, value);\n    } // property\n\n  }, {\n    key: \"setProperty\",\n    value: function setProperty(name, value) {\n      console.log(name, value);\n      this.properties.set(name, value);\n    } // children\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      console.log('Parent::appendChild', child); // child.mountTo(this.root);\n\n      this.children.push(child);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      // parent.appendChild(this.root);\n      this.render().mountTo(parent);\n\n      var _iterator = _createForOfIteratorHelper(this.children),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var child = _step.value;\n          // child.mountTo(this.root);\n          child.mountTo(this.slot);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      this.slot = create(\"div\", null);\n      return create(\"article\", null, create(\"h1\", null, this.attributes.get('title')), create(\"h2\", null, this.properties.get('title')), create(\"header\", null, \"I'm a header\"), this.slot, create(\"footer\", null, \"I'm a footer\"));\n    }\n  }, {\n    key: \"class\",\n    set: function set(v) {\n      console.log('Parent::class', v);\n    } // property\n\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      console.log('Parent::id', v);\n    }\n  }]);\n\n  return Div;\n}(); // 处理文字\n\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }]);\n\n  return Text;\n}();\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    console.log('type', type);\n    this.children = [];\n    this.root = document.createElement(type);\n  } // property\n\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    // attribute\n    value: function setAttribute(name, value) {\n      console.log(name, value);\n      this.root.setAttribute(name, value);\n    } // children\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      console.log('Parent::appendChild', child); // child.mountTo(this.root);\n\n      this.children.push(child);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator3 = _createForOfIteratorHelper(this.children),\n          _step3;\n\n      try {\n        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n          var child = _step3.value;\n          this.slot.appendChild(child); // child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator3.e(err);\n      } finally {\n        _iterator3.f();\n      }\n    }\n  }, {\n    key: \"class\",\n    set: function set(v) {\n      console.log('Parent::class', v);\n    } // property\n\n  }, {\n    key: \"id\",\n    set: function set(v) {\n      console.log('Parent::id', v);\n    }\n  }]);\n\n  return Wrapper;\n}();\n\nfunction create(Div, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  var o;\n\n  if (typeof Div === 'string') {\n    o = new Wrapper(Div);\n  } else {\n    o = new Div({\n      config: 'configTest',\n      timer: {}\n    });\n  }\n\n  console.log(arguments);\n\n  for (var name in attributes) {\n    // o[name] = attributes[name];\n    o.setAttribute(name, attributes[name]);\n  }\n\n  console.log(children);\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child === 'string') {\n      child = new Text(child);\n    }\n\n    o.appendChild(child);\n  }\n\n  return o;\n}\n/* let component = (\r\n  <Parent\r\n    id='a'\r\n    class='b'\r\n    style='width: 100px;height: 100px;background: green;'\r\n  >\r\n    <Child>a</Child>\r\n    <Child>b</Child>\r\n    <Child>c</Child>\r\n  </Parent>\r\n); */\n\n/* let component = (\r\n  <Div id='a' class='b' style='width: 100px;height: 100px;background: green;'>\r\n    <Div>a</Div>\r\n    <Div>b</Div>\r\n    <Div>c</Div>\r\n    <div></div>\r\n    <p></p>\r\n  </Div>\r\n); */\n\n\nvar component = create(Div, {\n  title: \"I am a title\"\n}, create(\"span\", null, \"text text text\"));\ncomponent[\"class\"] = 'c';\ncomponent.id = 'e'; // component.setAttribute('id', 'a');\n\nconsole.log(component);\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });