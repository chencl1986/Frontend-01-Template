function getCharPoint(char: string): number {
  let charPoint = char.codePointAt(0);

  // 当前值为字母时，需要按大小转换成9码点处理
  if (char.codePointAt(0) > 96) {
    charPoint = charPoint - 39;
  }

  return charPoint;
}

export default function convertStringToNumber(
  string: string,
  radix: number = 10,
): number {
  // 只处理2-36进制
  if (radix < 2 || radix > 36) {
    return NaN;
  }
  // 超过10进制字符串统一转换成小写字母处理
  let newString = string.toLocaleLowerCase();

  // 处理标准的2进制写法
  if (radix === 2 && newString.startsWith('0b')) {
    newString = newString.replace('0b', '');
  }

  // 处理标准的8进制写法
  if (radix === 8 && newString.startsWith('0o')) {
    newString = newString.replace('0o', '');
  }

  // 处理标准的16进制写法
  if (radix === 16 && newString.startsWith('0x')) {
    newString = newString.replace('0x', '');
  }

  const chars = newString.split('');
  const zeroCodePoint = '0'.codePointAt(0); // 0的码点
  const maxCodePoint = zeroCodePoint + radix - 1; // 当前进制最大值
  let result = 0; // 最终结果
  let number = 0; // 整数转换结果
  let fraction = 1; // 小数转换结果
  let i = 0; // 用于处理的索引

  // 将整数和小鼠分段处理，此处处理整数部分
  while (i < chars.length && chars[i] !== '.') {
    const charPoint = getCharPoint(chars[i]);

    // 如果超出进制最大值范围，直接返回NaN
    if (charPoint > maxCodePoint) {
      return NaN;
    }
    // 将上一个字符的结果向前进一位
    number = number * radix;
    /**
     * 字符编码转换，将数字字符串转换成Number
     * '1'.codePointAt(0).toString(2) // 110001
     * '0'.codePointAt(0).toString(2) // 110000
     * 相减为 1
     */
    number += charPoint - zeroCodePoint;
    i++;
  }

  // 遇到小数点直接跳过
  if (chars[i] === '.') {
    i++;
  }

  // 处理小数部分
  while (i < chars.length) {
    const charPoint = getCharPoint(chars[i]);

    // 如果超出进制最大值范围，直接返回NaN
    if (charPoint > maxCodePoint) {
      return NaN;
    }
    // 位数转换
    fraction = fraction / radix;
    // 字符编码转换，将数字字符串转换成Number
    number += (charPoint - '0'.codePointAt(0)) * fraction;
    i++;
    // fractionLength++;
  }

  result = number;

  return result;
}

// console.log(convertStringToNumber('9.9', 10));
console.log(convertStringToNumber('-9.9', 10));
// console.log(convertStringToNumber('a.a', 16));

/**
 * TODO:
 * 1. 待处理科学计数法，思路是判断e与正负数字结尾，然后将小数点移位，不足的位数用0补齐。
 * 2. 待处理负数场景。
 */
