type variableType = 'string' | 'number' | 'object' | 'undefined' | 'function' | 'boolean' | 'bigInt' | 'symbol'

/**
 * Class Lib
 * 基础函数库，Lodash、Underscore... So big
 */
export default class Lib {

  /**
   * typeOf 判断变量类型
   * @param value
   * @param type
   */
  static typeOf<T>(value: unknown, type: variableType): value is T {
    return typeof value === type
  }

  /**
   * getTag 判断变量类型
   * @param value
   */
  public static getTag(value: unknown): string {
    return Object.prototype.toString.call(value)
  }

  /**
   * isFunction 是否函数
   * @param {Function} value
   * @return {Boolean}
   */
  public static isFunction(value: unknown): value is typeof Function {
    return Lib.typeOf(value, 'function') && Lib.getTag(value) === '[object Function]'
  }

  /**
   * isString 是否字符串
   * @param {String} value
   * @return {Boolean}
   */
  public static isString(value: unknown): value is string {
    return Lib.typeOf(value, 'string') || Lib.getTag(value) === '[object String]'
  }

  /**
   * isNumber 是否数字
   * @param value
   * @return {Boolean}
   */
  static isNumber(value: unknown): value is number {
    return typeof value === 'number'
  }

  /**
   * isObject 是否对象
   * @param {Object} value
   */
  public static isObject(value: unknown): value is Record<any, any> {
    return Lib.getTag(value) === '[object Object]'
  }

  /**
   * isObject 是否Undefined
   * @param {*} value
   * @return boolean
   */
  static isUndefined(value: unknown): boolean {
    return value === undefined || Lib.getTag(value) === '[object Undefined]'
  }

  /**
   * isNull 是否Null
   * @param value
   */
  static isNull(value: unknown): boolean {
    return value === null || Lib.getTag(value) === '[object Null]'
  }

  /**
   * isEmpty 是否空
   * 目前只对 null undefined '' {} [] 做处理
   * @param value
   */
  static isEmpty(value: unknown): boolean {
    // null undefined '' 排除 0
    if (!value && value !== 0) {
      return true
    }
    // {} || []
    if (Lib.isObject(value) || Array.isArray(value)) {
      return JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]'
    }
    // Other
    return false
  }

  /**
   * isClass 是否类
   * @param value
   */
  public static isClass(value: unknown): boolean {
    // isFunction
    if (!Lib.isFunction(value)) {
      return false
    }
    // Function toString
    const str = value.toString()

    // async function or arrow function
    if ((value as typeof Function).prototype === undefined) return false
    // generator function or malformed definition
    if ((value as typeof Function).prototype.constructor !== value) return false
    // ES6 class
    if (str.slice(0, 5) === 'class') return true
    // has own prototype properties
    if (Object.getOwnPropertyNames((value as typeof Function).prototype).length >= 2) return true
    // anonymous function
    if (/^function\s+\(|^function\s+anonymous\(/.test(str)) return false
    // Other
    return false
  }
}
