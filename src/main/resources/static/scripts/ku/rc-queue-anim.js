(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["rc-queue-anim"] = factory(require("react"), require("react-dom"));
	else
		root["rc-queue-anim"] = factory(root["React"], root["ReactDOM"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_110__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.4' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(44);
var toPrimitive = __webpack_require__(21);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var ctx = __webpack_require__(43);
var hide = __webpack_require__(6);
var has = __webpack_require__(4);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47);
var defined = __webpack_require__(22);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(18);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(64);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["i"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["a"] = dataToArray;
/* harmony export (immutable) */ __webpack_exports__["f"] = objectEqual;
/* harmony export (immutable) */ __webpack_exports__["b"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["e"] = mergeChildren;
/* harmony export (immutable) */ __webpack_exports__["j"] = transformArguments;
/* harmony export (immutable) */ __webpack_exports__["c"] = getChildrenFromProps;
/* harmony export (immutable) */ __webpack_exports__["h"] = startConvertToEndUnit;
/* harmony export (immutable) */ __webpack_exports__["g"] = parsePath;
/* harmony export (immutable) */ __webpack_exports__["d"] = getTransformValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_deep_eql__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_deep_eql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_deep_eql__);




function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_1_react___default.a.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

function objectEqual(obj1, obj2) {
  if (obj1 === obj2 || __WEBPACK_IMPORTED_MODULE_2_deep_eql___default()(obj1, obj2)) {
    return true;
  }
  if (!obj1 || !obj2) {
    return false;
  }
  // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
  var equalBool = true;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (var i = 0; i < obj1.length; i++) {
      var currentObj = obj1[i];
      var nextObj = obj2[i];
      for (var p in currentObj) {
        if (currentObj[p] !== nextObj[p]) {
          if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(currentObj[p]) === 'object' && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(nextObj[p]) === 'object') {
            equalBool = objectEqual(currentObj[p], nextObj[p]);
          } else if (typeof currentObj[p] === 'function' && typeof nextObj[p] === 'function') {
            if (currentObj[p].name !== nextObj[p].name) {
              equalBool = false;
            }
          } else {
            equalBool = false;
            return false;
          }
        }
      }
    }
  }

  var setEqualBool = function setEqualBool(objA, objB) {
    Object.keys(objA).forEach(function (key) {
      if (!(key in objB)) {
        equalBool = false;
      }

      if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(objA[key]) === 'object' && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(objB[key]) === 'object') {
        equalBool = objectEqual(objA[key], objB[key]);
      } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
        if (objA[key].name !== objB[key].name) {
          equalBool = false;
        }
      } else if (objA[key] !== objB[key]) {
        equalBool = false;
      }
    });
  };

  setEqualBool(obj1, obj2);
  setEqualBool(obj2, obj1);
  return equalBool;
}

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (c) {
      if (ret || !c) {
        return;
      }
      if (c.key === key) {
        ret = c;
      }
    });
  }
  return ret;
}

function mergeChildren(prev, next) {
  var ret = [];
  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  var followChildrenKey = void 0;
  prev.forEach(function (c) {
    if (!c) {
      return;
    }
    if (findChildInChildrenByKey(next, c.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[c.key] = pendingChildren;
        pendingChildren = [];
      }
      followChildrenKey = c.key;
    } else if (c.key) {
      pendingChildren.push(c);
    }
  });
  if (!followChildrenKey) {
    ret = ret.concat(pendingChildren);
  }

  next.forEach(function (c) {
    if (!c) {
      return;
    }
    if (nextChildrenPending.hasOwnProperty(c.key)) {
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
    if (c.key === followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
  });

  return ret;
}

function transformArguments(arg, key, i) {
  var result = void 0;
  if (typeof arg === 'function') {
    result = arg({
      key: key,
      index: i
    });
  } else {
    result = arg;
  }
  return result;
}

function getChildrenFromProps(props) {
  return props && props.children;
}

function startConvertToEndUnit(target, style, num, unit, dataUnit, fixed, isOriginWidth) {
  var horiz = /(?:Left|Right|Width|X)/i.test(style) || isOriginWidth;
  var t = style.indexOf('border') !== -1 ? target : target.parentNode || document.body;
  t = fixed ? document.body : t;
  var pix = void 0;

  if (unit === '%') {
    pix = parseFloat(num) / 100 * (horiz ? t.clientWidth : t.clientHeight);
  } else if (unit === 'vw') {
    pix = parseFloat(num) * document.body.clientWidth / 100;
  } else if (unit === 'vh') {
    pix = parseFloat(num) * document.body.clientHeight / 100;
  } else if (unit && unit.match(/em/i)) {
    pix = parseFloat(num) * 16;
  } else {
    pix = parseFloat(num);
  }
  if (dataUnit === '%') {
    pix = pix ? pix * 100 / (horiz ? t.clientWidth : t.clientHeight) : 0;
  } else if (dataUnit === 'vw') {
    pix = parseFloat(num) / document.body.clientWidth * 100;
  } else if (dataUnit === 'vh') {
    pix = parseFloat(num) / document.body.clientHeight * 100;
  } else if (dataUnit && dataUnit.match(/em/i)) {
    pix = parseFloat(num) / 16;
  }
  return pix;
}
var domPath = void 0;
function parsePath(path) {
  if (typeof path === 'string') {
    if (path.charAt(0).match(/m/i)) {
      domPath = domPath || document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domPath.setAttributeNS(null, 'd', path);
      return domPath;
    }
    return document.querySelector(path);
  } else if (path.style) {
    return path;
  }
  throw new Error('Error while parsing the path');
}

function getTransformValue(t, supports3D) {
  if (typeof t === 'string') {
    return t;
  }
  var perspective = t.perspective;
  var angle = t.rotate;
  var rotateX = t.rotateX;
  var rotateY = t.rotateY;
  var sx = t.scaleX;
  var sy = t.scaleY;
  var sz = t.scaleZ;
  var skx = t.skewX;
  var sky = t.skewY;
  var xPercent = t.xPercent || 0;
  var yPercent = t.yPercent || 0;
  var translateX = xPercent ? 0 : t.translateX;
  var translateY = yPercent ? 0 : t.translateY;
  var translateZ = t.translateZ || 0;
  var percent = xPercent || yPercent ? 'translate(' + (xPercent || translateX + 'px') + ',' + (yPercent || translateY + 'px') + ')' : '';
  var sk = skx || sky ? 'skew(' + skx + 'deg,' + sky + 'deg)' : '';
  var an = angle ? 'rotate(' + angle + 'deg)' : '';
  var ss = void 0;
  if (!perspective && !rotateX && !rotateY && !translateZ && sz === 1 || !supports3D) {
    ss = sx !== 1 || sy !== 1 ? 'scale(' + sx + ',' + sy + ')' : '';
    var translate = percent || 'translate(' + translateX + 'px,' + translateY + 'px)';
    return translate + ' ' + an + ' ' + ss + ' ' + sk;
  }
  ss = sx !== 1 || sy !== 1 || sz !== 1 ? 'scale3d(' + sx + ',' + sy + ',' + sz + ')' : '';
  var rX = rotateX ? 'rotateX(' + rotateX + 'deg)' : '';
  var rY = rotateY ? 'rotateY(' + rotateY + 'deg)' : '';
  var per = perspective ? 'perspective(' + perspective + 'px)' : '';
  var translate3d = percent ? percent + ' translate3d(0,0,' + translateZ + 'px)' : 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)';
  return per + ' ' + translate3d + ' ' + ss + ' ' + an + ' ' + rX + ' ' + rY + ' ' + sk;
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(46);
var enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(73);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(85);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(18);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 27 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(20);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(12);
var dPs = __webpack_require__(78);
var enumBugKeys = __webpack_require__(26);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(45)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(79).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(2).f;
var has = __webpack_require__(4);
var TAG = __webpack_require__(9)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(9);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(34);
var defineProperty = __webpack_require__(2).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(95);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(99);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(20);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(102)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(105)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFixed = toFixed;
exports.createMatrix = createMatrix;
exports.checkStyleName = checkStyleName;
exports.getGsapType = getGsapType;
exports.parseColor = parseColor;
exports.parseShadow = parseShadow;
exports.getColor = getColor;
exports.isTransform = isTransform;
exports.isConvert = isConvert;
exports.splitFilterToObject = splitFilterToObject;
exports.getMatrix = getMatrix;
exports.getTransform = getTransform;
exports.stylesToCss = stylesToCss;
exports.getUnit = getUnit;
exports.getValues = getValues;
exports.findStyleByName = findStyleByName;
exports.mergeStyle = mergeStyle;
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

var IE = function () {
  if (typeof document === 'undefined') {
    return false;
  }
  if (navigator && (navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 9.0") > 0)) {
    return true;
  }
  return false;
}();

var rnd = 100000;

var colorLookup = {
  aqua: [0, 255, 255],
  lime: [0, 255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  white: [255, 255, 255],
  fuchsia: [255, 0, 255],
  olive: [128, 128, 0],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [255, 0, 0],
  pink: [255, 192, 203],
  cyan: [0, 255, 255],
  transparent: [255, 255, 255, 0]
};
var _hue = function _hue(hh, m1, m2) {
  var h = hh > 1 ? hh - 1 : hh;
  h = hh < 0 ? hh + 1 : h;
  var a = h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1;
  var b = h < 0.5 ? m2 : a;
  var c = h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : b;
  return c * 255 + 0.5 | 0;
};
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;

var cssList = {
  _lists: {
    transformsBase: ['translate', 'translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotateZ', 'rotate'],
    transforms3D: ['translate3d', 'translateZ', 'scaleZ', 'rotateX', 'rotateY', 'perspective']
  },
  transformGroup: { translate: 1, translate3d: 1, scale: 1, scale3d: 1, rotate: 1, rotate3d: 1 },
  filter: ['grayScale', 'sepia', 'hueRotate', 'invert', 'brightness', 'contrast', 'blur'],
  filterConvert: { grayScale: 'grayscale', hueRotate: 'hue-rotate' }
};
cssList._lists.transformsBase = !IE ? cssList._lists.transformsBase.concat(cssList._lists.transforms3D) : cssList._lists.transformsBase;

function toFixed(num, length) {
  var _rnd = length ? Math.pow(10, length) : rnd;
  var n = num | 0;
  var dec = num - n;
  return dec ? (dec * _rnd + (num < 0 ? -0.5 : 0.5) | 0) / _rnd + n : num;
}

function createMatrix(style) {
  if (typeof document === 'undefined') {
    return null;
  }
  var matrixs = ['WebKitCSS', 'MozCSS', 'DOM', 'MsCSS', 'MSCSS', 'OCSS', 'CSS'].filter(function (key) {
    return key + 'Matrix' in window;
  });
  if (matrixs.length) {
    return new window[matrixs[0] + 'Matrix'](style);
  }
  console.warn('Browsers do not support matrix.');
  return '';
}

function checkStyleName(p) {
  if (typeof document === 'undefined') {
    return null;
  }
  var a = ['O', 'Moz', 'ms', 'Ms', 'Webkit'];
  if (p !== 'filter' && p in document.body.style) {
    return p;
  }
  var _p = p.charAt(0).toUpperCase() + p.substr(1);
  var prefixCss = a.filter(function (key) {
    return '' + key + _p in document.body.style;
  });
  return prefixCss[0] ? '' + prefixCss[0] + _p : null;
}

function getGsapType(_p) {
  var p = _p;
  p = p === 'x' ? 'translateX' : p;
  p = p === 'y' ? 'translateY' : p;
  p = p === 'z' ? 'translateZ' : p;
  // p = p === 'r' ? 'rotate' : p;
  return p;
}

function parseColor(_v) {
  var a = void 0;
  var r = void 0;
  var g = void 0;
  var b = void 0;
  var h = void 0;
  var s = void 0;
  var l = void 0;
  var v = _v;
  var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g;
  if (!v) {
    a = colorLookup.black;
  } else if (typeof v === 'number') {
    a = [v >> 16, v >> 8 & 255, v & 255];
  } else {
    if (v.charAt(v.length - 1) === ',') {
      v = v.substr(0, v.length - 1);
    }
    if (colorLookup[v]) {
      a = colorLookup[v];
    } else if (v.charAt(0) === '#') {
      // is #FFF
      if (v.length === 4) {
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = '#' + r + r + g + g + b + b;
      }
      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else if (v.substr(0, 3) === 'hsl') {
      a = v.match(_numExp);
      h = Number(a[0]) % 360 / 360;
      s = Number(a[1]) / 100;
      l = Number(a[2]) / 100;
      g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      r = l * 2 - g;
      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
      a[0] = _hue(h + 1 / 3, r, g);
      a[1] = _hue(h, r, g);
      a[2] = _hue(h - 1 / 3, r, g);
    } else {
      a = v.match(_numExp) || colorLookup.transparent;
    }
    a[0] = Number(a[0]);
    a[1] = Number(a[1]);
    a[2] = Number(a[2]);

    if (a.length > 3) {
      a[3] = Number(a[3]);
    }
  }
  return a;
}

function parseShadow(v) {
  if (!v) {
    return [0, 0, 0, 0, 0, 0, 0];
  }
  var inset = void 0;
  if (v.indexOf('rgb') >= 0) {
    var t = v.match(/rgb+(?:a)?\((.*)\)/);
    var s = v.replace(t[0], '').trim().split(/\s+/);
    inset = s.indexOf('inset');
    if (inset >= 0) {
      s.splice(inset, 1);
    }
    var c = t[1].replace(/\s+/g, '').split(',');
    if (c.length === 3) {
      c.push(1);
    }
    return s.concat(c, inset >= 0 ? ['inset'] : []);
  }
  var vArr = v.split(/\s+/);
  inset = vArr.indexOf('inset');
  if (inset >= 0) {
    vArr.splice(inset, 1);
  }
  var color = parseColor(vArr[vArr.length - 1]);
  color[3] = typeof color[3] === 'number' ? color[3] : 1;
  vArr = vArr.splice(0, vArr.length - 1);
  return vArr.concat(color, inset >= 0 ? ['inset'] : []);
}

function getColor(v) {
  var rgba = v.length === 4 ? 'rgba' : 'rgb';
  var _vars = v.map(function (d, i) {
    return i < 3 ? Math.round(d) : d;
  });
  return rgba + '(' + _vars.join(',') + ')';
}

function isTransform(p) {
  return cssList._lists.transformsBase.indexOf(p) >= 0 ? 'transform' : p;
}

function isConvert(p) {
  var cssName = isTransform(p);
  return cssList.filter.indexOf(cssName) >= 0 ? 'filter' : cssName;
}

function splitFilterToObject(data) {
  if (data === 'none' || !data || data === '') {
    return null;
  }
  var filter = data.replace(' ', '').split(')').filter(function (item) {
    return item;
  });
  var startData = {};
  filter.forEach(function (item) {
    var dataArr = item.split('(');
    startData[dataArr[0]] = dataArr[1];
  });
  return startData;
}

function getMatrix(t) {
  var arr = t.match(/(?:\-|\b)[\d\-\.e]+\b/gi);
  var m = {};
  if (arr.length === 6) {
    m.m11 = parseFloat(arr[0]);
    m.m12 = parseFloat(arr[1]);
    m.m13 = 0;
    m.m14 = 0;
    m.m21 = parseFloat(arr[2]);
    m.m22 = parseFloat(arr[3]);
    m.m23 = 0;
    m.m24 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    m.m34 = 0;
    m.m41 = parseFloat(arr[4]);
    m.m42 = parseFloat(arr[5]);
    m.m43 = 0;
    m.m44 = 0;
  } else {
    arr.forEach(function (item, i) {
      var ii = i % 4 + 1;
      var j = Math.floor(i / 4) + 1;
      m['m' + j + ii] = parseFloat(item);
    });
  }
  return m;
}

function getTransform(transform) {
  var _transform = !transform || transform === 'none' || transform === '' ? 'matrix(1, 0, 0, 1, 0, 0)' : transform;
  var m = getMatrix(_transform);
  var m11 = m.m11;
  var m12 = m.m12;
  var m13 = m.m13;
  var m14 = m.m14;
  var m21 = m.m21;
  var m22 = m.m22;
  var m23 = m.m23;
  var m24 = m.m24;
  var m31 = m.m31;
  var m32 = m.m32;
  var m33 = m.m33;
  var m34 = m.m34;
  var m43 = m.m43;
  var t1 = void 0;
  var t2 = void 0;
  var t3 = void 0;
  var tm = {};
  tm.perspective = m34 ? toFixed(m33 / (m34 < 0 ? -m34 : m34)) : 0;
  tm.rotateX = toFixed(Math.asin(m23) * RAD2DEG);
  var angle = tm.rotateX * DEG2RAD;
  var skewX = Math.tan(m21);
  var skewY = Math.tan(m12);
  var cos = m34 * tm.perspective;
  var sin = void 0;
  // rotateX
  if (angle) {
    cos = Math.cos(-angle);
    sin = Math.sin(-angle);
    t1 = m21 * cos + m31 * sin;
    t2 = m22 * cos + m32 * sin;
    t3 = m23 * cos + m33 * sin;
    m31 = m21 * -sin + m31 * cos;
    m32 = m22 * -sin + m32 * cos;
    m33 = m23 * -sin + m33 * cos;
    m34 = m24 * -sin + m34 * cos;
    m21 = t1;
    m22 = t2;
    m23 = t3;
  }
  // rotateY
  angle = Math.atan2(m31, m33);
  tm.rotateY = toFixed(angle * RAD2DEG);
  if (angle) {
    cos = Math.cos(-angle);
    sin = Math.sin(-angle);
    t1 = m11 * cos - m31 * sin;
    t2 = m12 * cos - m32 * sin;
    t3 = m13 * cos - m33 * sin;
    m32 = m12 * sin + m32 * cos;
    m33 = m13 * sin + m33 * cos;
    m34 = m14 * sin + m34 * cos;
    m11 = t1;
    m12 = t2;
    m13 = t3;
  }
  // rotateZ
  angle = Math.atan2(m12, m11);
  tm.rotate = toFixed(angle * RAD2DEG);
  if (angle) {
    cos = Math.cos(-angle);
    sin = Math.sin(-angle);
    m11 = m11 * cos + m21 * sin;
    t2 = m12 * cos + m22 * sin;
    m22 = m12 * -sin + m22 * cos;
    m23 = m13 * -sin + m23 * cos;
    m12 = t2;
  }

  if (tm.rotateX && Math.abs(tm.rotateX) + Math.abs(tm.rotate) > 359.9) {
    tm.rotateX = tm.rotate = 0;
    tm.rotateY += 180;
  }
  tm.scaleX = toFixed(Math.sqrt(m11 * m11 + m12 * m12));
  tm.scaleY = toFixed(Math.sqrt(m22 * m22 + m32 * m32));
  tm.scaleZ = toFixed(Math.sqrt(m23 * m23 + m33 * m33));
  // 不管 skewX skewY了；
  tm.skewX = skewX === -skewY ? 0 : skewX;
  tm.skewY = skewY === -skewX ? 0 : skewY;
  tm.perspective = m34 ? 1 / (m34 < 0 ? -m34 : m34) : 0;
  tm.translateX = m.m41;
  tm.translateY = m.m42;
  tm.translateZ = m43;
  return tm;
}

function stylesToCss(key, value) {
  var _value = void 0;
  if (!isUnitlessNumber[key] && typeof value === 'number') {
    _value = ' ' + value + 'px';
  } else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
    _value = '\'' + value.replace(/'/g, "\\'") + '\'';
  }
  return _value || value;
}

function getUnit(p, v) {
  var currentUnit = v && v.toString().replace(/[^a-z|%]/ig, '');
  var unit = '';
  if (p.indexOf('translate') >= 0 || p.indexOf('perspective') >= 0 || p.indexOf('blur') >= 0) {
    unit = 'px';
  } else if (p.indexOf('skew') >= 0 || p.indexOf('rotate') >= 0) {
    unit = 'deg';
  }
  return currentUnit || unit;
}

function getValues(p, d, u) {
  return p + '(' + d + (u || '') + ')';
}

function findStyleByName(cssArray, name) {
  var ret = null;
  if (cssArray) {
    cssArray.forEach(function (_cname) {
      if (ret) {
        return;
      }
      var cName = _cname.split('(')[0];
      var a = cName in cssList.transformGroup && name.substring(0, name.length - 1).indexOf(cName) >= 0;
      var b = name in cssList.transformGroup && cName.substring(0, cName.length - 1).indexOf(name) >= 0;
      var c = cName in cssList.transformGroup && name in cssList.transformGroup && (cName.substring(0, cName.length - 2) === name || name.substring(0, name.length - 2) === cName);
      if (cName === name || a || b || c) {
        ret = _cname;
      }
    });
  }
  return ret;
}

function mergeStyle(current, change) {
  if (!current || current === '') {
    return change;
  }
  if (!change || change === '') {
    return current;
  }
  var _current = current.replace(/\s/g, '').split(')').filter(function (item) {
    return item !== '' && item;
  }).map(function (item) {
    return item + ')';
  });
  var _change = change.replace(/\s/g, '').split(')').filter(function (item) {
    return item !== '' && item;
  });
  _change.forEach(function (changeOnly) {
    var changeArr = changeOnly.split('(');
    var changeName = changeArr[0];
    var currentSame = findStyleByName(_current, changeName);
    if (!currentSame) {
      _current.push(changeOnly + ')');
    } else {
      var index = _current.indexOf(currentSame);
      _current[index] = changeOnly + ')';
    }
  });
  _current.forEach(function (item, i) {
    if (item.indexOf('perspective') >= 0 && i) {
      _current.splice(i, 1);
      _current.unshift(item);
    }
  });
  return _current.join(' ').trim();
}

exports.default = cssList;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable func-names */
var Plugins = function Plugins() {};
var p = Plugins.prototype;
p.push = function (plugin) {
  this[plugin.prototype.name] = plugin;
};
/* harmony default export */ __webpack_exports__["a"] = (new Plugins());

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(67);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(45)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(4);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(69)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(48);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(6);
var Iterators = __webpack_require__(31);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(33);
var getPrototypeOf = __webpack_require__(80);
var ITERATOR = __webpack_require__(9)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(46);
var hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(19);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(21);
var has = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(44);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(38);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_style_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_style_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Tween__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ticker__ = __webpack_require__(59);













function noop() {}

var perFrame = Math.round(1000 / 60);

var TweenOne = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(TweenOne, _Component);

  function TweenOne(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TweenOne);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TweenOne.__proto__ || Object.getPrototypeOf(TweenOne)).call(this, props));

    _initialiseProps.call(_this);

    _this.rafID = -1;
    _this.moment = props.moment || 0;
    _this.startMoment = props.moment || 0;
    _this.startFrame = __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame;
    _this.paused = props.paused;
    _this.reverse = props.reverse;
    _this.onChange = props.onChange;
    _this.newMomentAnim = false;
    _this.updateAnim = null;
    _this.forced = {};
    _this.setForcedJudg(props);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TweenOne, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dom = __WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(this);
      this.start();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.onChange = nextProps.onChange;
      // 跳帧事件 moment;
      var newMoment = nextProps.moment;
      this.newMomentAnim = false;
      if (typeof newMoment === 'number' && newMoment !== this.moment) {
        this.startMoment = newMoment;
        this.startFrame = __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame;
        if (this.rafID === -1 && !nextProps.paused) {
          this.tween.resetAnimData();
          var style = nextProps.style;
          this.dom.setAttribute('style', '');
          if (style) {
            Object.keys(style).forEach(function (key) {
              _this2.dom.style[key] = Object(__WEBPACK_IMPORTED_MODULE_9_style_utils__["stylesToCss"])(key, style[key]);
            });
          }
          this.play();
        } else {
          this.newMomentAnim = true;
        }
      }
      // 动画处理
      var newAnimation = nextProps.animation;
      var currentAnimation = this.props.animation;
      var equal = Object(__WEBPACK_IMPORTED_MODULE_8__util__["f" /* objectEqual */])(currentAnimation, newAnimation);
      var styleEqual = Object(__WEBPACK_IMPORTED_MODULE_8__util__["f" /* objectEqual */])(this.props.style, nextProps.style);
      // 如果 animation 不同， 在下一帧重新动画
      if (!equal) {
        // 在有动画的情况下才可以执行 resetDefaultStyle; 避免无动画时也把 style 刷成默认状态。
        if (nextProps.resetStyleBool && this.tween && this.rafID === -1) {
          this.tween.resetDefaultStyle();
        }
        if (this.rafID !== -1) {
          this.updateAnim = 'update';
        } else if (nextProps.updateReStart) {
          this.startFrame = __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame;
          this.updateAnim = 'start';
        }
        // 只做动画，不做回调处理。。。
        if (this.tween) {
          this.tween.updateAnim = this.updateAnim;
        }
      }

      if (!styleEqual) {
        // 在动画时更改了 style, 作为更改开始数值。
        if (this.rafID !== -1) {
          this.updateStartStyle = true;
        }
      }

      // 暂停倒放
      if (this.paused !== nextProps.paused || this.reverse !== nextProps.reverse) {
        this.paused = nextProps.paused;
        this.reverse = nextProps.reverse;
        if (this.paused) {
          this.cancelRequestAnimationFrame();
        } else {
          if (this.reverse && nextProps.reverseDelay) {
            this.cancelRequestAnimationFrame();
            __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].timeout(this.restart, nextProps.reverseDelay);
          } else {
            this.restart();
          }
        }
      }

      this.setForcedJudg(nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.updateStartStyle && !this.updateAnim) {
        this.tween.reStart(this.props.style);
        this.updateStartStyle = false;
      }

      if (this.newMomentAnim) {
        this.raf();
      }

      // 样式更新了后再执行动画；
      if (this.updateAnim === 'start') {
        this.start();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cancelRequestAnimationFrame();
    }

    /**
     * @method setForcedJudg
     * @param props
     * QueueAnim 套在组件下面后导至子级变化。
     * <QueueAnim component={Menu} >
     *   <SubMenu key="a" title="导航">
     *     <Item />
     *   </SubMenu>
     * </QueueAnim>
     * rc-Menu 里是以 isXXX 来判断是 rc-Menu 的子级;
     * 如: 用 isSubMenu 来处理 hover 事件
     * 地址: https://github.com/react-component/menu/blob/master/src/MenuMixin.js#L172
     * 暂时方案: 在组件里添加判断用的值。
     */

  }, {
    key: 'render',
    value: function render() {
      var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props);
      ['animation', 'component', 'componentProps', 'reverseDelay', 'attr', 'paused', 'reverse', 'moment', 'resetStyleBool', 'updateReStart', 'forcedJudg'].forEach(function (key) {
        return delete props[key];
      });
      props.style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props.style);
      Object.keys(props.style).forEach(function (p) {
        if (p.match(/filter/i)) {
          ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
            return props.style[prefix + 'Filter'] = props.style[p];
          });
        }
      });
      // component 为空时调用子级的。。
      if (!this.props.component) {
        var childrenProps = this.props.children.props;
        var style = childrenProps.style,
            className = childrenProps.className;
        // 合并 style 与 className。

        var newStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, style, props.style);
        var newClassName = props.className ? props.className + ' ' + className : className;
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.cloneElement(this.props.children, { style: newStyle, className: newClassName });
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(this.props.component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, this.props.componentProps));
    }
  }]);

  return TweenOne;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setForcedJudg = function (props) {
    Object.keys(_this3.forced).forEach(function (key) {
      delete _this3[key];
      delete _this3.forced[key];
    });
    if (props.forcedJudg) {
      Object.keys(props.forcedJudg).forEach(function (key) {
        if (!_this3[key]) {
          _this3[key] = props.forcedJudg[key];
          _this3.forced[key] = 1;
        }
      });
    }
  };

  this.restart = function () {
    if (!_this3.tween) {
      return;
    }
    _this3.startMoment = _this3.tween.progressTime;
    _this3.startFrame = __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame;
    _this3.tween.reverse = _this3.reverse;
    _this3.tween.reverseStartTime = _this3.startMoment;
    _this3.play();
  };

  this.start = function () {
    _this3.updateAnim = null;
    var props = _this3.props;
    if (props.animation && Object.keys(props.animation).length) {
      _this3.tween = new __WEBPACK_IMPORTED_MODULE_10__Tween__["a" /* default */](_this3.dom, Object(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* dataToArray */])(props.animation), { attr: props.attr });
      // 预先注册 raf, 初始动画数值。
      _this3.raf();
      // 开始动画
      _this3.play();
    }
  };

  this.play = function () {
    _this3.cancelRequestAnimationFrame();
    if (_this3.paused) {
      return;
    }
    _this3.rafID = __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].add(_this3.raf);
  };

  this.updateAnimFunc = function () {
    _this3.cancelRequestAnimationFrame();
    _this3.startFrame = __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame;
    if (_this3.updateAnim === 'update') {
      if (_this3.props.resetStyleBool && _this3.tween) {
        _this3.tween.resetDefaultStyle();
      }
      _this3.startMoment = 0;
    }
  };

  this.frame = function () {
    var moment = (__WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame - _this3.startFrame) * perFrame + _this3.startMoment;
    if (_this3.reverse) {
      moment = (_this3.startMoment || 0) - (__WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].frame - _this3.startFrame) * perFrame;
    }
    moment = moment > _this3.tween.totalTime ? _this3.tween.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    if (moment < _this3.moment && !_this3.reverse) {
      _this3.tween.resetDefaultStyle();
    }
    _this3.moment = moment;
    _this3.tween.onChange = _this3.onChange;
    _this3.tween.frame(moment);
  };

  this.raf = function () {
    _this3.frame();
    if (_this3.updateAnim) {
      if (_this3.updateStartStyle) {
        _this3.tween.reStart(_this3.props.style);
      }
      _this3.updateAnimFunc();
      _this3.start();
    }
    if (_this3.moment >= _this3.tween.totalTime && !_this3.reverse || _this3.paused || _this3.reverse && _this3.moment === 0) {
      return _this3.cancelRequestAnimationFrame();
    }
  };

  this.cancelRequestAnimationFrame = function () {
    __WEBPACK_IMPORTED_MODULE_11__ticker__["a" /* default */].clear(_this3.rafID);
    _this3.rafID = -1;
  };
};

var objectOrArray = __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array]);

TweenOne.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animation: objectOrArray,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  style: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  paused: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  reverse: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  reverseDelay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  moment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  attr: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  resetStyleBool: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  updateReStart: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  forcedJudg: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object
};

TweenOne.defaultProps = {
  component: 'div',
  componentProps: {},
  reverseDelay: 0,
  attr: 'style',
  onChange: noop,
  updateReStart: true
};
TweenOne.isTweenOne = true;
/* harmony default export */ __webpack_exports__["a"] = (TweenOne);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(107);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 57 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tween_functions__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tween_functions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tween_functions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(15);



__WEBPACK_IMPORTED_MODULE_0_tween_functions___default.a.path = function (_path, _param) {
  var param = _param || {};
  if (typeof window === 'undefined') {
    return 'linear';
  }
  var pathNode = Object(__WEBPACK_IMPORTED_MODULE_1__util__["g" /* parsePath */])(_path);
  var pathLength = pathNode.getTotalLength();
  var rect = param.rect || 100; // path 的大小，100 * 100，
  var lengthPixel = param.lengthPixel || 200; // 线上取点像素，默认分为 200 段。。
  var points = [];
  for (var i = 0; i < lengthPixel - 1; i++) {
    points.push(pathNode.getPointAtLength(pathLength / (lengthPixel - 1) * i));
  }
  points.push(pathNode.getPointAtLength(lengthPixel));
  return function path(t, b, _c, d) {
    var p = __WEBPACK_IMPORTED_MODULE_0_tween_functions___default.a.linear(t, b, _c, d);
    var timePointX = rect * p; // X 轴的百分比;
    // 取出 x 轴百分比上的点;
    var point = points.filter(function (item) {
      return item.x >= timePointX;
    })[0] || pathNode.getPointAtLength(p * pathLength);
    return 1 - point.y / rect;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_tween_functions___default.a);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raf__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_raf__);
/* eslint-disable func-names */


var getTime = Date.now || function () {
  return new Date().getTime();
};
var Ticker = function Ticker() {};

var p = Ticker.prototype = {
  tickFnArray: [],
  tickKeyObject: {},
  id: -1,
  tweenId: 0,
  frame: 0,
  perFrame: Math.round(1000 / 60),
  elapsed: 0,
  lastUpdate: getTime()
};
p.add = function (fn) {
  var key = 'TweenOneTicker' + this.tweenId;
  this.tweenId++;
  this.wake(key, fn);
  return key;
};
p.wake = function (key, fn) {
  var _this = this;

  this.tickKeyObject[key] = fn;
  this.tickFnArray = Object.keys(this.tickKeyObject).map(function (k) {
    return _this.tickKeyObject[k];
  });
  if (this.id === -1) {
    this.id = __WEBPACK_IMPORTED_MODULE_0_raf___default()(this.tick);
  }
};
p.clear = function (key) {
  var _this2 = this;

  delete this.tickKeyObject[key];
  this.tickFnArray = Object.keys(this.tickKeyObject).map(function (k) {
    return _this2.tickKeyObject[k];
  });
};
p.sleep = function () {
  __WEBPACK_IMPORTED_MODULE_0_raf___default.a.cancel(this.id);
  this.id = -1;
  this.frame = 0;
};
var ticker = new Ticker();
p.tick = function (a) {
  ticker.elapsed = getTime() - ticker.lastUpdate;
  ticker.lastUpdate += ticker.elapsed;
  ticker.tickFnArray.forEach(function (func) {
    return func(a);
  });
  // 如果 object 里没对象了，自动杀掉；
  if (!ticker.tickFnArray.length) {
    ticker.sleep();
    return;
  }
  if (!ticker.frame) {
    ticker.frame++;
  } else {
    ticker.frame += Math.round(ticker.elapsed / ticker.perFrame);
  }
  ticker.id = __WEBPACK_IMPORTED_MODULE_0_raf___default()(ticker.tick);
};
var timeoutIdNumber = 0;
p.timeout = function (fn, time) {
  var _this3 = this;

  if (!(typeof fn === 'function')) {
    return console.warn('not function'); // eslint-disable-line
  }
  var timeoutID = 'timeout' + Date.now() + '-' + timeoutIdNumber;
  var startFrame = this.frame;
  this.wake(timeoutID, function () {
    var moment = (_this3.frame - startFrame) * _this3.perFrame;
    if (moment >= (time || 0)) {
      _this3.clear(timeoutID);
      fn();
    }
  });
  timeoutIdNumber++;
  return timeoutID;
};
var intervalIdNumber = 0;
p.interval = function (fn, time) {
  var _this4 = this;

  if (!(typeof fn === 'function')) {
    console.warn('not function'); // eslint-disable-line
    return null;
  }
  var intervalID = 'interval' + Date.now() + '-' + intervalIdNumber;
  var starFrame = this.frame;
  this.wake(intervalID, function () {
    var moment = (_this4.frame - starFrame) * _this4.perFrame;
    if (moment >= (time || 0)) {
      starFrame = _this4.frame;
      fn();
    }
  });
  intervalIdNumber++;
  return intervalID;
};
/* harmony default export */ __webpack_exports__["a"] = (ticker);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
module.exports = __webpack_require__(62);


/***/ }),
/* 61 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QueueAnim__ = __webpack_require__(63);
// export this package's api


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__QueueAnim__["a" /* default */]);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__animTypes__ = __webpack_require__(120);











var noop = function noop() {};

var typeDefault = ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps', 'childContextTypes', 'contextTypes'];

var QueueAnim = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(QueueAnim, _React$Component);

  function QueueAnim(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, QueueAnim);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    _this.oneEnter = false;
    _this.tweenToShow = {};
    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.keysToEnterPaused = {};
    _this.placeholderTimeoutIds = {};
    // 第一次进入，默认进场
    var children = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(props));
    var childrenShow = {};
    children.forEach(function (child) {
      if (!child || !child.key) {
        return;
      }
      if (_this.props.appear) {
        _this.keysToEnter.push(child.key);
      } else {
        childrenShow[child.key] = true;
      }
    });
    _this.keysToEnterToCallback = [].concat(_this.keysToEnter);
    _this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(props));
    _this.state = {
      children: children,
      childrenShow: childrenShow
    };
    return _this;
  }

  QueueAnim.prototype.componentDidMount = function componentDidMount() {
    if (this.props.appear) {
      this.componentDidUpdate();
    }
    this.oneEnter = true;
  };

  QueueAnim.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* toArrayChildren */])(nextProps.children).filter(function (item) {
      return item;
    });
    var currentChildren = this.originalChildren.filter(function (item) {
      return item;
    });
    if (this.state.children.length) {
      /**
       * 多次刷新处理
       * 如果 state.children 里还有元素，元素还在动画，当前子级加回在出场的子级;
       */
      var leaveChild = this.state.children.filter(function (item) {
        return item && _this2.keysToLeave.indexOf(item.key) >= 0;
      });
      currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["c" /* mergeChildren */])(currentChildren, leaveChild);
    }
    var newChildren = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["c" /* mergeChildren */])(currentChildren, nextChildren);

    var childrenShow = !newChildren.length ? {} : this.state.childrenShow;
    this.keysToEnterPaused = {};
    var emptyBool = !nextChildren.length && !currentChildren.length && this.state.children.length;
    /**
     * 在出场没结束时，childrenShow 里的值将不会清除。
     * 再触发进场时， childrenShow 里的值是保留着的, 设置了 enterForcedRePlay 将重新播放进场。
     */
    if (!emptyBool) {
      // 空子级状态下刷新不做处理
      var nextKeys = nextChildren.map(function (c) {
        return c.key;
      });
      this.keysToLeave.forEach(function (key) {
        // 将所有在出场里的停止掉。避免间隔性出现
        if (nextKeys.indexOf(key) >= 0) {
          _this2.keysToEnterPaused[key] = true;
          currentChildren = currentChildren.filter(function (item) {
            return item.key !== key;
          });
          if (nextProps.enterForcedRePlay) {
            // 清掉所有出场的。
            delete childrenShow[key];
          }
        }
      });
    }

    this.keysToEnter = [];
    this.keysToLeave = [];

    // need render to avoid update
    this.setState({
      childrenShow: childrenShow,
      children: newChildren
    });

    nextChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasPrev = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
      if (!hasPrev && key) {
        _this2.keysToEnter.push(key);
      }
    });

    currentChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasNext = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* findChildInChildrenByKey */])(nextChildren, key);
      if (!hasNext && key) {
        _this2.keysToLeave.push(key);
      }
    });
    this.keysToEnterToCallback = [].concat(this.keysToEnter);
  };

  QueueAnim.prototype.componentDidUpdate = function componentDidUpdate() {
    this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(this.props));
    var keysToEnter = [].concat(this.keysToEnter);
    var keysToLeave = [].concat(this.keysToLeave);
    keysToEnter.forEach(this.performEnter);
    keysToLeave.forEach(this.performLeave);
  };

  QueueAnim.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
      __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].clear(_this3.placeholderTimeoutIds[key]);
    });
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  QueueAnim.prototype.getTweenType = function getTweenType(type, num) {
    var data = __WEBPACK_IMPORTED_MODULE_9__animTypes__["a" /* default */][type];
    return this.getTweenAnimConfig(data, num);
  };

  QueueAnim.prototype.getTweenSingleConfig = function getTweenSingleConfig(data, num, enterOrLeave) {
    var obj = {};
    Object.keys(data).forEach(function (key) {
      if (Array.isArray(data[key])) {
        obj[key] = data[key][num];
      } else if (!enterOrLeave && !num || enterOrLeave && num) {
        obj[key] = data[key];
      }
    });
    return obj;
  };

  QueueAnim.prototype.getTweenAnimConfig = function getTweenAnimConfig(data, num, enterOrLeave) {
    var _this4 = this;

    if (Array.isArray(data)) {
      return data.map(function (item) {
        return _this4.getTweenSingleConfig(item, num, enterOrLeave);
      });
    }
    return this.getTweenSingleConfig(data, num, enterOrLeave);
  };

  QueueAnim.prototype.render = function render() {
    var tagProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(this.props, []);

    ['component', 'componentProps', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'enterForcedRePlay', 'onEnd', 'appear'].forEach(function (key) {
      return delete tagProps[key];
    });
    var childrenToRender = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* toArrayChildren */])(this.state.children).map(this.getChildrenToRender);
    var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, tagProps, this.props.componentProps);
    return Object(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])(this.props.component, props, childrenToRender);
  };

  return QueueAnim;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

QueueAnim.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  interval: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  duration: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  delay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  type: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animConfig: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  ease: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  leaveReverse: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  enterForcedRePlay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  animatingClassName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array,
  onEnd: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  appear: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool
};
QueueAnim.defaultProps = {
  component: 'div',
  componentProps: {},
  interval: 100,
  duration: 450,
  delay: 0,
  type: 'right',
  animConfig: null,
  ease: 'easeOutQuart',
  leaveReverse: false,
  enterForcedRePlay: false,
  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
  onEnd: noop,
  appear: true
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.getTweenData = function (key, i, type) {
    var props = _this5.props;
    var enterOrLeave = type === 'enter' ? 0 : 1;
    var start = type === 'enter' ? 1 : 0;
    var end = type === 'enter' ? 0 : 1;
    var startAnim = _this5.getAnimData(props, key, i, enterOrLeave, start);
    var animate = _this5.getAnimData(props, key, i, enterOrLeave, end);
    startAnim = type === 'enter' && props.enterForcedRePlay || !_this5.tweenToShow[key] ? startAnim : {};
    var ease = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.ease, key, i)[enterOrLeave];
    var duration = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.duration, key, i)[enterOrLeave];
    if (Array.isArray(ease)) {
      ease = ease.map(function (num) {
        return num * 100;
      });
      ease = __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["a" /* default */].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
    }
    return { startAnim: startAnim, animate: animate, ease: ease, duration: duration, isArray: Array.isArray(animate) };
  };

  this.getTweenSingleData = function (key, startAnim, animate, ease, duration, delay, onStart, onComplete) {
    var startLength = Object.keys(startAnim || {}).length;
    var animation = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
      onStart: onStart,
      onComplete: onComplete,
      duration: duration,
      delay: delay,
      ease: ease
    }, animate);
    var startAnimate = startLength ? __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ duration: 0 }, startAnim) : null;
    return { animation: animation, startAnimate: startAnimate };
  };

  this.getTweenEnterOrLeaveData = function (key, i, delay, type) {
    var animateData = _this5.getTweenData(key, i, type);
    var startAnim = animateData.startAnim;
    var animate = animateData.animate;
    var onStart = (type === 'enter' ? _this5.enterBegin : _this5.leaveBegin).bind(_this5, key);
    var onComplete = (type === 'enter' ? _this5.enterComplete : _this5.leaveComplete).bind(_this5, key);
    if (animateData.isArray) {
      var length = animate.length - 1;
      var animation = [];
      var startArray = [];
      animate.forEach(function (leave, ii) {
        var start = startAnim[ii];
        var animObj = _this5.getTweenSingleData(key, start, leave, animateData.ease, animateData.duration / length, !ii ? delay : 0, !ii ? onStart : null, ii === length ? onComplete : null);
        animation.push(animObj.animation);
        if (animObj.startAnimate) {
          startArray.push(animObj.startAnimate);
        }
      });
      return startArray.concat(animation);
    }
    animateData = _this5.getTweenSingleData(key, startAnim, animate, animateData.ease, animateData.duration, delay, onStart, onComplete);
    return [animateData.startAnimate, animateData.animation].filter(function (item) {
      return item;
    });
  };

  this.getTweenAppearData = function (key, i) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this5.getAnimData(_this5.props, key, i, 0, 0), {
      duration: 0
    });
  };

  this.getAnimData = function (props, key, i, enterOrLeave, startOrEnd) {
    /**
     * transformArguments 第一个为 enter, 第二个为 leave；
     * getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。
     * 用 tween-one 的数组来实现老的动画逻辑。。。
     */
    return props.animConfig ? _this5.getTweenAnimConfig(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave) : _this5.getTweenType(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.type, key, i)[enterOrLeave], startOrEnd);
  };

  this.getChildrenToRender = function (child) {
    if (!child || !child.key) {
      return child;
    }
    var key = child.key;
    if (!_this5.state.childrenShow[key]) {
      return null;
    }
    var i = _this5.keysToLeave.indexOf(key);
    var animation = void 0;
    // 处理出场
    if (i >= 0) {
      var interval = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(_this5.props.interval, key, i)[1];
      var delay = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(_this5.props.delay, key, i)[1];
      var order = _this5.props.leaveReverse ? _this5.keysToLeave.length - i - 1 : i;
      delay = interval * order + delay;
      animation = _this5.getTweenEnterOrLeaveData(key, i, delay, 'leave');
    } else {
      // 处理进场;
      i = _this5.keysToEnterToCallback.indexOf(key);
      if (!_this5.oneEnter && !_this5.props.appear) {
        animation = _this5.getTweenAppearData(key, i);
      } else {
        animation = _this5.getTweenEnterOrLeaveData(key, i, 0, 'enter');
      }
    }
    var paused = _this5.keysToEnterPaused[key] && !_this5.keysToLeave.indexOf(key) >= 0;

    animation = paused ? null : animation;
    var isFunc = typeof child.type === 'function';
    var forcedJudg = isFunc ? {} : null;
    if (isFunc) {
      Object.keys(child.type).forEach(function (name) {
        if (typeDefault.indexOf(name) === -1) {
          forcedJudg[name] = child.type[name];
        }
      });
    }
    return Object(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["a" /* default */], { key: key, component: child.type, componentProps: child.props, forcedJudg: forcedJudg, animation: animation });
  };

  this.performEnter = function (key, i) {
    var interval = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(_this5.props.interval, key, i)[0];
    var delay = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(_this5.props.delay, key, i)[0];
    _this5.placeholderTimeoutIds[key] = __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
    if (_this5.keysToEnter.indexOf(key) >= 0) {
      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
    }
  };

  this.performEnterBegin = function (key) {
    var childrenShow = _this5.state.childrenShow;
    childrenShow[key] = true;
    delete _this5.keysToEnterPaused[key];
    __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
    _this5.setState({ childrenShow: childrenShow });
  };

  this.performLeave = function (key) {
    __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
  };

  this.enterBegin = function (key, e) {
    var elem = e.target;
    var animatingClassName = _this5.props.animatingClassName;
    elem.className = elem.className.replace(animatingClassName[1], '');
    if (elem.className.indexOf(animatingClassName[0]) === -1) {
      elem.className = (elem.className + ' ' + animatingClassName[0]).trim();
    }
    _this5.tweenToShow[key] = true;
  };

  this.enterComplete = function (key, e) {
    if (_this5.keysToEnterPaused[key] || _this5.keysToLeave.indexOf(key) >= 0) {
      return;
    }
    var elem = e.target;
    elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
    _this5.props.onEnd({ key: key, type: 'enter' });
  };

  this.leaveBegin = function (key, e) {
    var elem = e.target;
    var animatingClassName = _this5.props.animatingClassName;
    elem.className = elem.className.replace(animatingClassName[0], '');
    if (elem.className.indexOf(animatingClassName[1]) === -1) {
      elem.className = (elem.className + ' ' + animatingClassName[1]).trim();
    }
  };

  this.leaveComplete = function (key, e) {
    // 切换时同时触发 onComplete。 手动跳出。。。
    if (_this5.keysToEnterToCallback.indexOf(key) >= 0) {
      return;
    }
    var childrenShow = _this5.state.childrenShow;
    delete childrenShow[key];
    if (_this5.keysToLeave.indexOf(key) >= 0) {
      _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
      delete _this5.tweenToShow[key];
    }
    var needLeave = _this5.keysToLeave.some(function (c) {
      return childrenShow[c];
    });
    if (!needLeave) {
      var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(_this5.props));
      _this5.setState({
        children: currentChildren,
        childrenShow: childrenShow
      });
    }
    var elem = e.target;
    elem.className = elem.className.replace(_this5.props.animatingClassName[1], '').trim();
    _this5.props.onEnd({ key: key, type: 'leave' });
  };
};

QueueAnim.isQueueAnim = true;
/* harmony default export */ __webpack_exports__["a"] = (QueueAnim);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(68) });


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(27);
var pIE = __webpack_require__(19);
var toObject = __webpack_require__(49);
var IObject = __webpack_require__(47);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(70);
var toAbsoluteIndex = __webpack_require__(71);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
__webpack_require__(81);
module.exports = __webpack_require__(34).f('iterator');


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(76)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(50)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var defined = __webpack_require__(22);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(32);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(33);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(9)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var anObject = __webpack_require__(12);
var getKeys = __webpack_require__(17);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(4);
var toObject = __webpack_require__(49);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var global = __webpack_require__(0);
var hide = __webpack_require__(6);
var Iterators = __webpack_require__(31);
var TO_STRING_TAG = __webpack_require__(9)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(83);
var step = __webpack_require__(84);
var Iterators = __webpack_require__(31);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(50)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
__webpack_require__(92);
__webpack_require__(93);
__webpack_require__(94);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(51);
var META = __webpack_require__(88).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(33);
var uid = __webpack_require__(18);
var wks = __webpack_require__(9);
var wksExt = __webpack_require__(34);
var wksDefine = __webpack_require__(35);
var enumKeys = __webpack_require__(89);
var isArray = __webpack_require__(90);
var anObject = __webpack_require__(12);
var isObject = __webpack_require__(7);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(21);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(32);
var gOPNExt = __webpack_require__(91);
var $GOPD = __webpack_require__(53);
var $DP = __webpack_require__(2);
var $keys = __webpack_require__(17);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(52).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(19).f = $propertyIsEnumerable;
  __webpack_require__(27).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(18)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(4);
var setDesc = __webpack_require__(2).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(27);
var pIE = __webpack_require__(19);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(48);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(52).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {



/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(98).set });


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(12);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(43)(Function.call, __webpack_require__(53).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(32) });


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(38);
var invariant = __webpack_require__(39);
var warning = __webpack_require__(54);
var assign = __webpack_require__(103);

var ReactPropTypesSecret = __webpack_require__(40);
var checkPropTypes = __webpack_require__(104);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(39);
  var warning = __webpack_require__(54);
  var ReactPropTypesSecret = __webpack_require__(40);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(38);
var invariant = __webpack_require__(39);
var ReactPropTypesSecret = __webpack_require__(40);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TweenOneGroup */
/* unused harmony export easing */
/* unused harmony export plugins */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ticker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TweenOne__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__easing__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ticker__ = __webpack_require__(59);
// export this package's api






__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].TweenOneGroup = __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].easing = __WEBPACK_IMPORTED_MODULE_2__easing__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].plugins = __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].ticker = __WEBPACK_IMPORTED_MODULE_4__ticker__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */]);

var TweenOneGroup = __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__["a" /* default */];

var easing = __WEBPACK_IMPORTED_MODULE_2__easing__["a" /* default */];

var plugins = __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */];

var ticker = __WEBPACK_IMPORTED_MODULE_4__ticker__["a" /* default */];

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(2).f });


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_110__;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var type = __webpack_require__(112);
function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = type(leftHandOperand);
  if (leftHandType !== type(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typeDetect = factory());
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__easing__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugin_StylePlugin__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_style_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_style_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(15);

/* eslint-disable func-names */
/**
 * Created by jljsj on 16/1/27.
 */





var DEFAULT_EASING = 'easeInOutQuad';
var DEFAULT_DURATION = 450;
var DEFAULT_DELAY = 0;
function noop() {}
__WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */].push(__WEBPACK_IMPORTED_MODULE_3__plugin_StylePlugin__["a" /* default */]);
// 设置默认数据
function defaultData(vars, now) {
  return {
    duration: vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION,
    delay: vars.delay || DEFAULT_DELAY,
    ease: typeof vars.ease === 'function' ? vars.ease : __WEBPACK_IMPORTED_MODULE_1__easing__["a" /* default */][vars.ease || DEFAULT_EASING],
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    yoyo: vars.yoyo || false,
    type: vars.type || 'to',
    initTime: now,
    appearTo: typeof vars.appearTo === 'number' ? vars.appearTo : null,
    perTime: 0,
    currentRepeat: 0
  };
}

var Tween = function Tween(target, toData, props) {
  this.target = target;
  this.attr = props.attr || 'style';
  // 记录总时间;
  this.totalTime = 0;
  // 记录当前时间;
  this.progressTime = 0;
  // 记录时间轴数据;
  this.defaultData = [];
  // 每个的开始数据；
  this.start = {};
  // 开始默认的数据；
  this.startDefaultData = {};
  // 动画过程
  this.tween = {};
  // toData;
  this.data = toData;
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 注册，第一次进入执行注册
  this.register = false;
  // svg元素
  this.isSvg = this.target.ownerSVGElement;
  // 设置 style
  var data = this.setAttrIsStyle();
  // 设置默认动画数据;
  this.setDefaultData(data);
};
var p = Tween.prototype;
p.setAttrIsStyle = function () {
  var _this = this;

  var data = [];
  this.data.forEach(function (d, i) {
    var _d = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, d);
    if (_this.attr === 'style') {
      data[i] = {};
      Object.keys(_d).forEach(function (key) {
        if (key in defaultData({}, 0)) {
          data[i][key] = _d[key];
          delete _d[key];
        }
      });
      data[i].style = _d;
      _this.startDefaultData.style = _this.target.getAttribute('style');
    } else if (_this.attr === 'attr') {
      Object.keys(_d).forEach(function (key) {
        if (key === 'style' && Array.isArray(d[key])) {
          throw new Error('Style should be the object.');
        }
        if (key === 'bezier') {
          _d.style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _d.style, { bezier: _d[key] });
          delete _d[key];
          _this.startDefaultData.style = _this.target.getAttribute('style');
        } else {
          _this.startDefaultData[key] = _this.target.getAttribute(key);
        }
      });
      data[i] = _d;
    }
  });
  return data;
};
p.setDefaultData = function (_vars) {
  var _this2 = this;

  var now = 0;
  var repeatMax = false;
  var data = _vars.map(function (item) {
    var appearToBool = typeof item.appearTo === 'number';
    // 加上延时，在没有播放过时；
    if (!appearToBool) {
      now += item.delay || 0;
    }
    var appearToTime = (item.appearTo || 0) + (item.delay || 0);
    // 获取默认数据
    var tweenData = defaultData(item, appearToBool ? appearToTime : now);
    tweenData.vars = {};
    Object.keys(item).forEach(function (_key) {
      if (!(_key in tweenData)) {
        var _data = item[_key];
        if (_key in __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */]) {
          tweenData.vars[_key] = new __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */][_key](_this2.target, _data, tweenData.type);
        } else if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
          tweenData.vars[_key] = { type: 'color', vars: Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["parseColor"])(_data) };
        } else if (typeof _data === 'number' || _data.split(/[,|\s]/g).length <= 1) {
          var vars = parseFloat(_data);
          var unit = _data.toString().replace(/[^a-z|%]/g, '');
          var count = _data.toString().replace(/[^+|=|-]/g, '');
          tweenData.vars[_key] = { unit: unit, vars: vars, count: count };
        } else if ((_key === 'd' || _key === 'points') && 'SVGMorph' in __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */]) {
          tweenData.vars[_key] = new __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */].SVGMorph(_this2.target, _data, _key);
        }
      }
    });
    if (tweenData.yoyo && !tweenData.repeat) {
      console.warn('Warning: yoyo must be used together with repeat;'); // eslint-disable-line
    }
    if (tweenData.repeat === -1) {
      repeatMax = true;
    }
    var repeat = tweenData.repeat === -1 ? 0 : tweenData.repeat;
    if (appearToBool) {
      // 如果有 appearTo 且这条时间比 now 大时，，总时间用这条；
      var appearNow = item.appearTo + (item.delay || 0) + tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
      now = appearNow >= now ? appearNow : now;
    } else {
      if (tweenData.delay < -tweenData.duration) {
        // 如果延时小于 负时间时,,不加,再减回延时;
        now -= tweenData.delay;
      } else {
        // repeat 为 -1 只记录一次。不能跟 reverse 同时使用;
        now += tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
      }
    }
    tweenData.mode = '';
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.getComputedStyle = function () {
  var style = typeof window !== 'undefined' && document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
  // 如果是 SVG, 样式全部提出为 transformSVG, 兼容 safari 不能获取 transform;
  if (this.isSvg) {
    var transform = style[Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["checkStyleName"])('transform')] || 'none';
    if (transform === 'none') {
      var attrStyle = this.target.getAttribute('style');
      if (attrStyle && attrStyle.indexOf('transform:') >= 0) {
        transform = attrStyle.split(';').filter(function (k) {
          return k.indexOf('transform:') >= 0;
        }).map(function (item) {
          return Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["createMatrix"])(item.split(':')[1].trim()).toString();
        })[0];
      } else if (this.target.getAttribute('transform')) {
        // 暂时不支持标签上的 transform，后期增加;
        console.warn('Do not add transform on the label, otherwise it will be invalid.');
      }
    }
    style.transformSVG = transform;
  }
  return style;
};
p.getAnimStartData = function (item) {
  var _this3 = this;

  var start = {};
  this.computedStyle = this.computedStyle || this.getComputedStyle();
  Object.keys(item).forEach(function (_key) {
    if (_key in __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */] || _this3.attr === 'attr' && (_key === 'd' || _key === 'points')) {
      start[_key] = item[_key].getAnimStart(_this3.computedStyle, _this3.isSvg);
      return;
    }
    if (_this3.attr === 'attr') {
      // 除了d和这points外的标签动画；
      var attribute = _this3.target.getAttribute(_key);
      var data = attribute === 'null' || !attribute ? 0 : attribute;
      if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
        data = !data && _key === 'stroke' ? 'rgba(255, 255, 255, 0)' : data;
        data = Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["parseColor"])(data);
        start[_key] = data;
      } else if (parseFloat(data) || parseFloat(data) === 0 || data === 0) {
        var unit = data.toString().replace(/[^a-z|%]/g, '');
        start[_key] = unit !== item[_key].unit ? Object(__WEBPACK_IMPORTED_MODULE_5__util_js__["h" /* startConvertToEndUnit */])(_this3.target, _key, parseFloat(data), unit, item[_key].unit) : parseFloat(data);
      }
      return;
    }
    start[_key] = _this3.target[_key] || 0;
  });
  return start;
};
p.setAnimData = function (data) {
  var _this4 = this;

  Object.keys(data).forEach(function (key) {
    if (key in __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */] || _this4.attr === 'attr' && (key === 'd' || key === 'points')) {
      return;
    }
    _this4.target[key] = data[key];
  });
};
p.setRatio = function (ratio, endData, i) {
  var _this5 = this;

  Object.keys(endData.vars).forEach(function (_key) {
    if (_key in __WEBPACK_IMPORTED_MODULE_2__plugins__["a" /* default */] || _this5.attr === 'attr' && (_key === 'd' || _key === 'points')) {
      endData.vars[_key].setRatio(ratio, _this5.tween, _this5.isSvg && _this5.computedStyle);
      return;
    }
    var endVars = endData.vars[_key];
    var startVars = _this5.start[i][_key];
    var data = void 0;
    if (_this5.attr === 'attr') {
      // 除了d和这points外的标签动画；
      if (!endVars.type) {
        data = endVars.unit.charAt(1) === '=' ? startVars + endVars.vars * ratio + endVars.unit : (endVars.vars - startVars) * ratio + startVars + endVars.unit;
        _this5.target.setAttribute(_key, data);
      } else if (endVars.type === 'color') {
        if (endVars.vars.length === 3 && startVars.length === 4) {
          endVars.vars[3] = 1;
        }
        data = endVars.vars.map(function (_endData, _i) {
          var startData = startVars[_i] || 0;
          return (_endData - startData) * ratio + startData;
        });
        _this5.target.setAttribute(_key, Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["getColor"])(data));
      }
    }
  });
  this.setAnimData(this.tween);
};
p.render = function () {
  var _this6 = this;

  var reverse = this.reverse;
  this.defaultData.forEach(function (item, i) {
    var initTime = item.initTime;
    var duration = Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["toFixed"])(item.duration);
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    var repeatNum = Math.ceil((_this6.progressTime - initTime) / (duration + item.repeatDelay)) - 1;
    repeatNum = repeatNum < 0 ? 0 : repeatNum;
    if (item.repeat) {
      if (item.repeat < repeatNum && item.repeat !== -1) {
        return;
      }
      if (item.repeat || item.repeat <= repeatNum) {
        initTime = initTime + repeatNum * (duration + item.repeatDelay);
      }
    }
    var startData = item.yoyo && repeatNum % 2 ? 1 : 0;
    var endData = item.yoyo && repeatNum % 2 ? 0 : 1;
    startData = item.type === 'from' ? 1 - startData : startData;
    endData = item.type === 'from' ? 1 - endData : endData;
    //  精度损失，只取小数点后10位。
    var progressTime = Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["toFixed"])(_this6.progressTime - initTime);

    var ratio = void 0;

    // 开始注册;
    // from 时需先执行参数位置;
    var fromDelay = item.type === 'from' ? item.delay : 0;
    if (progressTime + fromDelay >= 0) {
      if (!_this6.start[i]) {
        // 设置 start
        _this6.start[i] = _this6.getAnimStartData(item.vars);
        if (progressTime < _this6.perFrame) {
          ratio = !item.duration && !item.delay ? item.ease(1, startData, endData, 1) : item.ease(0, startData, endData, 1);
          _this6.setRatio(Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["toFixed"])(ratio), item, i);
        } else if (progressTime > duration) {
          ratio = item.ease(1, startData, endData, 1);
          _this6.setRatio(ratio, item, i);
        }
        if (!_this6.register) {
          _this6.register = true;
          if (progressTime === 0 && item.duration) {
            return;
          }
        }
      }
    }

    var e = {
      index: i,
      target: _this6.target
    };

    if (progressTime > -_this6.perFrame && !(progressTime > duration && item.mode === 'onComplete') && _this6.start[i]) {
      var updateAnim = _this6.updateAnim === 'update';
      if (progressTime >= duration && !reverse || reverse && progressTime <= 0) {
        // onReveresComplete 和 onComplete 统一用 onComplete;
        ratio = item.ease(reverse ? 0 : 1, startData, endData, 1);
        _this6.setRatio(Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["toFixed"])(ratio), item, i);
        if (item.mode !== 'reset' && !updateAnim) {
          item.onComplete(e);
        }
        item.mode = 'onComplete';
      } else if (duration) {
        ratio = item.ease(progressTime < 0 ? 0 : progressTime, startData, endData, duration);
        _this6.setRatio(ratio, item, i);
        if (!updateAnim) {
          if (item.repeat && repeatNum > 0 && item.currentRepeat !== repeatNum) {
            item.mode = 'onRepeat';
            item.currentRepeat = repeatNum;
            item.onRepeat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, e, { repeatNum: repeatNum }));
          } else if ((!item.perTime || reverse && item.perTime >= _this6.reverseStartTime - initTime) && item.mode !== 'onStart') {
            // onReveresStart 和 onStart 统一用 onStart;
            item.mode = 'onStart';
            item.onStart(e);
          } else {
            item.mode = 'onUpdate';
            item.onUpdate(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ ratio: ratio }, e));
          }
        }
      }

      if (!updateAnim) {
        _this6.onChange(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          moment: _this6.progressTime,
          mode: item.mode
        }, e));
      }
      item.perTime = progressTime;
    }
  });
};
// 播放帧
p.frame = function (moment) {
  this.progressTime = moment;
  this.render();
};
p.resetAnimData = function () {
  this.tween = {};
  this.start = {};
};

p.resetDefaultStyle = function () {
  var _this7 = this;

  this.tween = {};
  this.defaultData = this.defaultData.map(function (item) {
    item.mode = 'reset';
    return item;
  });
  Object.keys(this.startDefaultData).forEach(function (key) {
    if (!(key in defaultData({}, 0))) {
      _this7.target.setAttribute(key, _this7.startDefaultData[key]);
    }
  });
};

p.reStart = function (style) {
  var _this8 = this;

  this.start = {};
  Object.keys(style).forEach(function (key) {
    _this8.target.style[key] = Object(__WEBPACK_IMPORTED_MODULE_4_style_utils__["stylesToCss"])(key, style[key]);
  });
  this.setAttrIsStyle();
  this.resetDefaultStyle();
};

p.onChange = noop;
/* harmony default export */ __webpack_exports__["a"] = (Tween);

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// t: current time, b: beginning value, _c: final value, d: total duration
var tweenFunctions = {
  linear: function(t, b, _c, d) {
    var c = _c - b;
    return c * t / d + b;
  },
  easeInQuad: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function(t, b, _c, d) {
    var c = _c - b;
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    } else {
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
  easeInCubic: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function(t, b, _c, d) {
    var c = _c - b;
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  },
  easeInQuart: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function(t, b, _c, d) {
    var c = _c - b;
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b;
    } else {
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  easeInQuint: function(t, b, _c, d) {
    var c = _c - b;
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function(t, b, _c, d) {
    var c = _c - b;
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  easeInSine: function(t, b, _c, d) {
    var c = _c - b;
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function(t, b, _c, d) {
    var c = _c - b;
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function(t, b, _c, d) {
    var c = _c - b;
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function(t, b, _c, d) {
    var c = _c - b;
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function(t, b, _c, d) {
    var c = _c - b;
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function(t, b, _c, d) {
    var c = _c - b;
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  easeInCirc: function(t, b, _c, d) {
    var c = _c - b;
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function(t, b, _c, d) {
    var c = _c - b;
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d / 2) < 1) {
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    } else {
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  easeInElastic: function(t, b, _c, d) {
    var c = _c - b;
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      return b;
    } else if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function(t, b, _c, d) {
    var c = _c - b;
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      return b;
    } else if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function(t, b, _c, d) {
    var c = _c - b;
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      return b;
    } else if ((t /= d / 2) === 2) {
      return b + c;
    }
    if (!p) {
      p = d * (0.3 * 1.5);
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    } else {
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
  },
  easeInBack: function(t, b, _c, d, s) {
    var c = _c - b;
    if (s === void 0) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function(t, b, _c, d, s) {
    var c = _c - b;
    if (s === void 0) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function(t, b, _c, d, s) {
    var c = _c - b;
    if (s === void 0) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    } else {
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
  },
  easeInBounce: function(t, b, _c, d) {
    var c = _c - b;
    var v;
    v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
    return c - v + b;
  },
  easeOutBounce: function(t, b, _c, d) {
    var c = _c - b;
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function(t, b, _c, d) {
    var c = _c - b;
    var v;
    if (t < d / 2) {
      v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
      return v * 0.5 + b;
    } else {
      v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
      return v * 0.5 + c * 0.5 + b;
    }
  }
};

module.exports = tweenFunctions;


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_style_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(42);

/* eslint-disable func-names, no-console */




var StylePlugin = function StylePlugin(target, vars, type) {
  this.target = target;
  this.vars = vars;
  this.type = type;
  this.propsData = {};
  this.setDefaultData();
};
var p = StylePlugin.prototype = {
  name: 'style'
};
p.getTweenData = function (key, vars) {
  var data = {
    data: {},
    dataType: {},
    dataUnit: {},
    dataCount: {},
    dataSplitStr: {}
  };
  if (key.match(/colo|fill|storker/i)) {
    data.data[key] = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseColor"])(vars);
    data.dataType[key] = 'color';
  } else if (key.match(/shadow/i)) {
    data.data[key] = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseShadow"])(vars);
    data.dataType[key] = 'shadow';
  } else if (typeof vars === 'string' && vars.split(/[\s|,]/).length > 1) {
    data.data[key] = vars.split(/[\s|,]/);
    data.dataSplitStr[key] = vars.replace(/[^\s|,]/g, '');
    data.dataType[key] = 'string';
  } else {
    data.data[key] = vars;
    data.dataType[key] = 'other';
  }
  if (Array.isArray(data.data[key])) {
    data.dataUnit[key] = data.data[key].map(function (_item) {
      return _item.toString().replace(/[^a-z|%]/g, '');
    });
    data.dataCount[key] = data.data[key].map(function (_item) {
      return _item.toString().replace(/[^+|=|-]/g, '');
    });

    data.data[key] = data.data[key].map(function (_item) {
      return !parseFloat(_item) && parseFloat(_item) !== 0 ? _item : parseFloat(_item);
    });
  } else {
    data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
    data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
    var d = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
    data.data[key] = !d && d !== 0 ? data.data[key] : d;
  }
  return data;
};
p.setDefaultData = function () {
  var _this = this;

  this.propsData.data = {};
  this.propsData.dataType = {};
  this.propsData.dataUnit = {};
  this.propsData.dataCount = {};
  this.propsData.dataSplitStr = {};
  Object.keys(this.vars).forEach(function (_key) {
    if (_key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
      _this.propsData.data[_key] = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */][_key](_this.target, _this.vars[_key]);
      return;
    }
    var key = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getGsapType"])(_key);
    var _data = _this.getTweenData(key, _this.vars[_key]);
    _this.propsData.data[key] = _data.data[key];
    _this.propsData.dataType[key] = _data.dataType[key];
    _this.propsData.dataUnit[key] = _data.dataUnit[key];
    _this.propsData.dataCount[key] = _data.dataCount[key];
    if (_data.dataSplitStr[key]) {
      _this.propsData.dataSplitStr[key] = _data.dataSplitStr[key];
    }
  });
};
p.convertToMarksArray = function (unit, key, data, i) {
  var startUnit = data.toString().replace(/[^a-z|%]/g, '');
  var endUnit = unit[i];
  if (startUnit === endUnit) {
    return parseFloat(data);
  } else if (!parseFloat(data) && parseFloat(data) !== 0) {
    return data;
  }
  return Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["h" /* startConvertToEndUnit */])(this.target, key, data, startUnit, endUnit, null, key === 'transformOrigin' && !i);
};
p.getAnimStart = function (computedStyle, isSvg) {
  var _this2 = this;

  var style = {};
  this.supports3D = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('perspective');
  Object.keys(this.propsData.data).forEach(function (key) {
    var cssName = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["isConvert"])(key);
    var startData = computedStyle[cssName];
    var fixed = computedStyle.position === 'fixed';
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    var transform = void 0;
    var endUnit = void 0;
    var startUnit = void 0;
    if (key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
      if (key === 'bezier') {
        _this2.transform = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('transform');
        startData = computedStyle[isSvg ? 'transformSVG' : _this2.transform];
        style.transform = style.transform || Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getTransform"])(startData);
      }
      _this2.propsData.data[key].getAnimStart(computedStyle, isSvg);
    } else if (cssName === 'transform') {
      _this2.transform = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('transform');
      startData = computedStyle[isSvg ? 'transformSVG' : _this2.transform];
      endUnit = _this2.propsData.dataUnit[key];
      transform = style.transform || Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getTransform"])(startData);
      if (endUnit && endUnit.match(/%|vw|vh|em|rem/i)) {
        var percent = key === 'translateX' ? 'xPercent' : 'yPercent';
        transform[percent] = Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["h" /* startConvertToEndUnit */])(_this2.target, key, transform[key], null, endUnit);
        transform[key] = 0;
      }
      style.transform = transform;
    } else if (cssName === 'filter') {
      _this2.filterName = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('filter') || 'filter';
      startData = computedStyle[_this2.filterName];
      _this2.filterObject = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this2.filterObject, Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["splitFilterToObject"])(startData));
      startData = _this2.filterObject[key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = _this2.propsData.dataUnit[key];
      if (endUnit !== startUnit) {
        startData = Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["h" /* startConvertToEndUnit */])(_this2.target, cssName, parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[key] = parseFloat(startData);
    } else if (key.match(/color|fill/i) || key === 'stroke') {
      startData = !startData && key === 'stroke' ? 'rgba(255, 255, 255, 0)' : startData;
      style[cssName] = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseColor"])(startData);
    } else if (key.match(/shadow/i)) {
      startData = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseShadow"])(startData);
      endUnit = _this2.propsData.dataUnit[key];
      startData = startData.map(_this2.convertToMarksArray.bind(_this2, endUnit, key));
      style[cssName] = startData;
    } else if (Array.isArray(_this2.propsData.data[key])) {
      startData = startData.split(/[\s|,]/);
      endUnit = _this2.propsData.dataUnit[key];
      startData = startData.map(_this2.convertToMarksArray.bind(_this2, endUnit, key));
      style[cssName] = startData;
    } else {
      // 计算单位
      endUnit = _this2.propsData.dataUnit[cssName];
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      if (endUnit !== startUnit) {
        startData = Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["h" /* startConvertToEndUnit */])(_this2.target, cssName, parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[cssName] = parseFloat(startData || 0);
    }
  });
  this.start = style;
  return style;
};
p.setArrayRatio = function (ratio, start, vars, unit, type) {
  if (type === 'color' && start.length === 4 && vars.length === 3) {
    vars[3] = 1;
  }
  var startInset = start.indexOf('inset') >= 0;
  var endInset = vars.indexOf('inset') >= 0;
  if (startInset && !endInset || endInset && !startInset) {
    throw console.error('Error: "box-shadow" inset have to exist');
  }
  var length = endInset ? 9 : 8;
  if (start.length === length && vars.length === length - 1) {
    vars.splice(3, 0, 0);
    unit.splice(3, 0, '');
  } else if (vars.length === length && start.length === length - 1) {
    start.splice(3, 0, 0);
  }
  var _vars = vars.map(function (endData, i) {
    var startIsAlpha = type === 'color' && i === 3 && !start[i] ? 1 : 0;
    var startData = typeof start[i] === 'number' ? start[i] : startIsAlpha;
    if (typeof endData === 'string') {
      return endData;
    }
    return (endData - startData) * ratio + startData + (unit[i] || 0);
  });
  if (type === 'color') {
    return Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getColor"])(_vars);
  } else if (type === 'shadow') {
    var l = _vars.length === length ? 4 : 3;
    var s = _vars.slice(0, l).map(function (item) {
      if (typeof item === 'number') {
        return item + 'px';
      }
      return item;
    });
    var c = _vars.slice(l, endInset ? _vars.length - 1 : _vars.length);
    var color = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getColor"])(c);
    return (s.join(' ') + ' ' + color + ' ' + (endInset ? 'inset' : '')).trim();
  }
  return _vars;
};

p.setRatio = function (ratio, tween, computedStyle) {
  var _this3 = this;

  tween.style = tween.style || {};
  if (this.start.transform) {
    tween.style.transform = tween.style.transform || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.start.transform);
  }
  var style = this.target.style;
  Object.keys(this.propsData.data).forEach(function (key) {
    var _isTransform = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["isTransform"])(key) === 'transform';
    var startVars = _isTransform ? _this3.start.transform[key] : _this3.start[key];
    var endVars = _this3.propsData.data[key];
    var unit = _this3.propsData.dataUnit[key];
    var count = _this3.propsData.dataCount[key];
    if (key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
      _this3.propsData.data[key].setRatio(ratio, tween, computedStyle);
      if (key === 'bezier') {
        style[_this3.transform] = Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["d" /* getTransformValue */])(tween.style.transform, _this3.supports3D);
      } else {
        Object.keys(tween.style).forEach(function (css) {
          return style[css] = tween.style[css];
        });
      }
      return;
    } else if (_isTransform) {
      if (unit && unit.match(/%|vw|vh|em|rem/i)) {
        var pName = key === 'translateX' ? 'xPercent' : 'yPercent';
        startVars = _this3.start.transform[pName];
        if (count.charAt(1) === '=') {
          tween.style.transform[pName] = startVars + endVars * ratio + unit;
        } else {
          tween.style.transform[pName] = (endVars - startVars) * ratio + startVars + unit;
        }
      } else if (key === 'scale') {
        var xStart = _this3.start.transform.scaleX;
        var yStart = _this3.start.transform.scaleY;
        if (count.charAt(1) === '=') {
          tween.style.transform.scaleX = xStart + endVars * ratio;
          tween.style.transform.scaleY = yStart + endVars * ratio;
        } else {
          tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
          tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
        }
      }
      if (count.charAt(1) === '=') {
        tween.style.transform[key] = startVars + endVars * ratio;
      } else {
        tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
      }
      style[_this3.transform] = Object(__WEBPACK_IMPORTED_MODULE_2__util_js__["d" /* getTransformValue */])(tween.style.transform, _this3.supports3D);
      if (computedStyle) {
        computedStyle.transformSVG = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["createMatrix"])(style[_this3.transform]).toString();
      }
      return;
    } else if (Array.isArray(endVars)) {
      var _type = _this3.propsData.dataType[key];
      tween.style[key] = _this3.setArrayRatio(ratio, startVars, endVars, unit, _type);
      if (_type === 'string') {
        tween.style[key] = tween.style[key].join(_this3.propsData.dataSplitStr[key]);
      }
    } else {
      var styleUnit = Object(__WEBPACK_IMPORTED_MODULE_1_style_utils__["stylesToCss"])(key, 0);
      styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
      unit = unit || (__WEBPACK_IMPORTED_MODULE_1_style_utils___default.a.filter.indexOf(key) >= 0 ? '' : styleUnit);
      if (typeof endVars === 'string') {
        tween.style[key] = endVars;
      } else {
        if (count.charAt(1) === '=') {
          tween.style[key] = startVars + endVars * ratio + unit;
        } else {
          var value = (endVars - startVars) * ratio + startVars;
          tween.style[key] = unit ? '' + value + unit : value;
        }
      }
    }
    if (__WEBPACK_IMPORTED_MODULE_1_style_utils___default.a.filter.indexOf(key) >= 0) {
      if (!_this3.filterObject) {
        return;
      }
      _this3.filterObject[key] = tween.style[key];
      var filterStyle = '';
      Object.keys(_this3.filterObject).forEach(function (filterKey) {
        filterStyle += ' ' + filterKey + '(' + _this3.filterObject[filterKey] + ')';
      });
      style[_this3.filterName] = filterStyle.trim();
      return;
    }
    style[key] = tween.style[key];
  });
};
/* harmony default export */ __webpack_exports__["a"] = (StylePlugin);

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(117)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__TweenOne__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util__ = __webpack_require__(15);











function noop() {}

var TweenOneGroup = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(TweenOneGroup, _Component);

  function TweenOneGroup() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, TweenOneGroup);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TweenOneGroup.__proto__ || Object.getPrototypeOf(TweenOneGroup)).apply(this, arguments));

    _initialiseProps.call(_this);

    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.saveTweenTag = {};
    _this.onEnterBool = false;
    _this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    var children = Object(__WEBPACK_IMPORTED_MODULE_9__util__["i" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_9__util__["c" /* getChildrenFromProps */])(_this.props));
    _this.state = {
      children: children
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(TweenOneGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onEnterBool = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_9__util__["i" /* toArrayChildren */])(nextProps.children);
      var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_9__util__["i" /* toArrayChildren */])(this.state.children);
      var newChildren = Object(__WEBPACK_IMPORTED_MODULE_9__util__["e" /* mergeChildren */])(currentChildren, nextChildren);

      this.keysToEnter = [];
      this.keysToLeave = [];
      nextChildren.forEach(function (c) {
        if (!c) {
          return;
        }
        var key = c.key;
        var hasPrev = Object(__WEBPACK_IMPORTED_MODULE_9__util__["b" /* findChildInChildrenByKey */])(currentChildren, key);
        // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
        if (_this2.saveTweenTag[key]) {
          _this2.saveTweenTag[key] = __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(_this2.saveTweenTag[key], {}, c);
        }
        if (!hasPrev && key) {
          _this2.keysToEnter.push(key);
        }
      });

      currentChildren.forEach(function (c) {
        if (!c) {
          return;
        }
        var key = c.key;
        var hasNext = Object(__WEBPACK_IMPORTED_MODULE_9__util__["b" /* findChildInChildrenByKey */])(nextChildren, key);
        if (!hasNext && key) {
          _this2.keysToLeave.push(key);
          delete _this2.saveTweenTag[key];
        }
      });
      this.setState({
        children: newChildren
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var childrenToRender = this.getChildrenToRender(this.state.children);
      if (!this.props.component) {
        return childrenToRender[0] || null;
      }
      var componentProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.props);
      ['component', 'componentProps', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'resetStyleBool'].forEach(function (key) {
        return delete componentProps[key];
      });
      return Object(__WEBPACK_IMPORTED_MODULE_6_react__["createElement"])(this.props.component, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, componentProps, this.props.componentProps), childrenToRender);
    }
  }]);

  return TweenOneGroup;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (animation, key, type, obj) {
    var length = Object(__WEBPACK_IMPORTED_MODULE_9__util__["a" /* dataToArray */])(animation).length;
    var tag = obj.target;
    var classIsSvg = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(tag.className) === 'object' && 'baseVal' in tag.className;
    var isEnter = type === 'enter' || type === 'appear';
    if (obj.mode === 'onStart') {
      if (classIsSvg) {
        tag.className.baseVal = _this3.setClassName(tag.className.baseVal, isEnter);
      } else {
        tag.className = _this3.setClassName(tag.className, isEnter);
      }
    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
      if (type === 'enter') {
        _this3.keysToEnter.splice(_this3.keysToEnter.indexOf(key), 1);
      } else if (type === 'leave') {
        var children = _this3.state.children.filter(function (child) {
          return key !== child.key;
        });
        _this3.keysToLeave.splice(_this3.keysToLeave.indexOf(key), 1);
        delete _this3.saveTweenTag[key];
        _this3.setState({
          children: children
        });
      }
      if (classIsSvg) {
        tag.className.baseVal = tag.className.baseVal.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
      } else {
        tag.className = tag.className.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
      }
      delete _this3.isTween[key];
      var _obj = { key: key, type: type };
      _this3.props.onEnd(_obj);
    }
  };

  this.setClassName = function (name, isEnter) {
    var className = name.replace(_this3.props.animatingClassName[isEnter ? 1 : 0], '').trim();
    if (className.indexOf(_this3.props.animatingClassName[isEnter ? 0 : 1]) === -1) {
      className = (className + ' ' + _this3.props.animatingClassName[isEnter ? 0 : 1]).trim();
    }
    return className;
  };

  this.getTweenChild = function (child) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var key = child.key;
    _this3.saveTweenTag[key] = __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__TweenOne__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, props, {
      key: key,
      component: null
    }), child);
    return _this3.saveTweenTag[key];
  };

  this.getCoverAnimation = function (child, i, type) {
    var animation = void 0;
    var onChange = void 0;
    animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
    if (type === 'appear') {
      var appear = Object(__WEBPACK_IMPORTED_MODULE_9__util__["j" /* transformArguments */])(_this3.props.appear, child.key, i);
      animation = appear && _this3.props.enter || null;
    }
    onChange = _this3.onChange.bind(_this3, animation, child.key, type);
    var animate = Object(__WEBPACK_IMPORTED_MODULE_9__util__["j" /* transformArguments */])(animation, child.key, i);
    var props = {
      key: child.key,
      animation: animate,
      onChange: onChange,
      resetStyleBool: _this3.props.resetStyleBool
    };
    var children = _this3.getTweenChild(child, props);
    if (_this3.keysToEnter.concat(_this3.keysToLeave).indexOf(child.key) >= 0 || !_this3.onEnterBool && animation) {
      _this3.isTween[child.key] = type;
    }
    return children;
  };

  this.getChildrenToRender = function (children) {
    return children.map(function (child, i) {
      if (!child || !child.key) {
        return child;
      }
      var key = child.key;

      if (_this3.keysToLeave.indexOf(key) >= 0) {
        return _this3.getCoverAnimation(child, i, 'leave');
      } else if ((_this3.keysToEnter.indexOf(key) >= 0 || _this3.isTween[key] && _this3.keysToLeave.indexOf(key) === -1) && !(_this3.isTween[key] === 'enter' && _this3.saveTweenTag[key])) {
        /**
        * 1. 在 key 在 enter 里。
        * 2. 出场未结束，触发进场, this.isTween[key] 为 leave, key 在 enter 里。
        * 3. 状态为 enter 且 tweenTag 里有值时，不执行重载动画属性，直接调用 tweenTag 里的。
        */
        return _this3.getCoverAnimation(child, i, 'enter');
      } else if (!_this3.onEnterBool) {
        return _this3.getCoverAnimation(child, i, 'appear');
      }
      return _this3.saveTweenTag[key];
    });
  };
};

TweenOneGroup.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  style: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  appear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  enter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  leave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  animatingClassName: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.array,
  onEnd: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  resetStyleBool: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool
};

TweenOneGroup.defaultProps = {
  component: 'div',
  componentProps: {},
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
  resetStyleBool: true
};
TweenOneGroup.isTweenOneGroup = true;
/* harmony default export */ __webpack_exports__["a"] = (TweenOneGroup);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["a"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["c"] = mergeChildren;
/* harmony export (immutable) */ __webpack_exports__["e"] = transformArguments;
/* harmony export (immutable) */ __webpack_exports__["b"] = getChildrenFromProps;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (c) {
      if (ret || !c) {
        return;
      }
      if (c.key === key) {
        ret = c;
      }
    });
  }
  return ret;
}

function mergeChildren(prev, next) {
  var ret = [];
  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  var followChildrenKey = void 0;
  prev.forEach(function (c) {
    if (!c) {
      return;
    }
    if (findChildInChildrenByKey(next, c.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[c.key] = pendingChildren;
        pendingChildren = [];
      }
      followChildrenKey = c.key;
    } else if (c.key) {
      pendingChildren.push(c);
    }
  });
  if (!followChildrenKey) {
    ret = ret.concat(pendingChildren);
  }
  next.forEach(function (c) {
    if (!c) {
      return;
    }
    if (nextChildrenPending.hasOwnProperty(c.key)) {
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
    if (c.key === followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
  });

  return ret;
}

function transformArguments(arg, key, i) {
  var result = void 0;
  if (typeof arg === 'function') {
    result = arg({
      key: key,
      index: i
    });
  } else {
    result = arg;
  }
  if (Array.isArray(result)) {
    if (result.length === 2) {
      return result;
    }
    return [result[0], result[0]];
  }
  return [result, result];
}

function getChildrenFromProps(props) {
  return props && props.children;
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  left: {
    opacity: [1, 0],
    translateX: [0, -30]
  },
  top: {
    opacity: [1, 0],
    translateY: [0, -30]
  },
  right: {
    opacity: [1, 0],
    translateX: [0, 30]
  },
  bottom: {
    opacity: [1, 0],
    translateY: [0, 30]
  },
  alpha: {
    opacity: [1, 0]
  },
  scale: {
    opacity: [1, 0],
    scale: [1, 0]
  },
  scaleBig: {
    opacity: [1, 0],
    scale: [1, 2]
  },
  scaleX: {
    opacity: [1, 0],
    scaleX: [1, 0]
  },
  scaleY: {
    opacity: [1, 0],
    scaleY: [1, 0]
  }
});

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=rc-queue-anim.js.map