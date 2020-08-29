"use strict";
exports.__esModule = true;
// UTF8编码
var UTF8Encoder = /** @class */ (function () {
    function UTF8Encoder() {
    }
    /**
     * 将传入字符串或数字编码成UTF-8
     * @param {string} input 输入的字符串或数字
     * @return {string} UTF-8编码
     */
    UTF8Encoder.encoding = function (input) {
        if (!String.prototype.codePointAt) {
            UTF8Encoder.codePointAtPolyfill();
        }
        if (typeof input !== 'string' && typeof input !== 'number') {
            return [];
        }
        var result = [];
        Array.from(input).forEach(function (char) {
            var unicode = char.codePointAt(0);
            var unicodeStr = unicode.toString(2);
            if (unicode <= 0x007f) {
                var fullUnicode = UTF8Encoder.zeroCompletion(unicodeStr, 7);
                result.push(["0" + fullUnicode]);
            }
            else if (unicode <= 0x07ff) {
                var fullUnicode = "" + UTF8Encoder.zeroCompletion(unicodeStr, 11);
                var fullUnicodeArr = [fullUnicode.slice(0, 5), fullUnicode.slice(5)];
                result.push(["110" + fullUnicodeArr[0], "10" + fullUnicodeArr[1]]);
            }
            else if (unicode <= 0xffff) {
                var fullUnicode = "" + UTF8Encoder.zeroCompletion(unicodeStr, 16);
                var fullUnicodeArr = [
                    fullUnicode.slice(0, 4),
                    fullUnicode.slice(4, 10),
                    fullUnicode.slice(10),
                ];
                result.push([
                    "1110" + fullUnicodeArr[0],
                    "10" + fullUnicodeArr[1],
                    "10" + fullUnicodeArr[2],
                ]);
            }
            else if (unicode <= 0x10ffff) {
                var fullUnicode = "" + UTF8Encoder.zeroCompletion(unicodeStr, 16);
                var fullUnicodeArr = [
                    fullUnicode.slice(0, 3),
                    fullUnicode.slice(3, 9),
                    fullUnicode.slice(9, 15),
                    fullUnicode.slice(15),
                ];
                result.push([
                    "11110" + fullUnicodeArr[0],
                    "10" + fullUnicodeArr[1],
                    "10" + fullUnicodeArr[2],
                    "10" + fullUnicodeArr[3],
                ]);
            }
        });
        return result;
    };
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
     * 给原生不支持 ECMAScript 6 的浏览器使用codePointAt()方法的的一个字符串扩展方法。
     */
    UTF8Encoder.codePointAtPolyfill = function () {
        (function () {
            'use strict'; // 严格模式，needed to support `apply`/`call` with `undefined`/`null`
            var codePointAt = function (position) {
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                var size = string.length;
                // 变成整数
                var index = position ? Number(position) : 0;
                if (index != index) {
                    // better `isNaN`
                    index = 0;
                }
                // 边界
                if (index < 0 || index >= size) {
                    return undefined;
                }
                // 第一个编码单元
                var first = string.charCodeAt(index);
                var second;
                if (
                // 检查是否开始 surrogate pair
                first >= 0xd800 &&
                    first <= 0xdbff && // high surrogate
                    size > index + 1 // 下一个编码单元
                ) {
                    second = string.charCodeAt(index + 1);
                    if (second >= 0xdc00 && second <= 0xdfff) {
                        // low surrogate
                        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                        return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
                    }
                }
                return first;
            };
            if (Object.defineProperty) {
                Object.defineProperty(String.prototype, 'codePointAt', {
                    value: codePointAt,
                    configurable: true,
                    writable: true
                });
            }
            else {
                String.prototype.codePointAt = codePointAt;
            }
        })();
    };
    // 将输入字符串转换成规定长度，不足的位数用0补全
    UTF8Encoder.zeroCompletion = function (str, length) {
        if (str.length >= length) {
            return str;
        }
        var additionLength = length - str.length;
        var additionArr = new Array(additionLength).fill('0');
        var additionStr = additionArr.join('');
        var result = additionStr + str;
        return result;
    };
    return UTF8Encoder;
}());
exports["default"] = UTF8Encoder;
console.log(UTF8Encoder.encoding("\uFFFF"));
console.log(UTF8Encoder.encoding("\uDBFF\uDFFF"));
console.log(UTF8Encoder.encoding("\uFFFF\uDBFF\uDFFF"));
console.log(UTF8Encoder.encoding("\u07FF\uFFFF\uDBFF\uDFFF"));
console.log(UTF8Encoder.encoding('012'));
console.log(UTF8Encoder.encoding('\u0111'));
