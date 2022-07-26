export default class Lib {
    /**
     * typeOf 类型
     * @param {*} value
     */
    static typeOf(value: unknown): string;
    /**
     * getTag 处理类型
     * @param {*} value
     */
    static getTag(value: unknown): string;
    /**
     * isFunction 是否函数
     * @param {Function} value
     * @return {Boolean}
     */
    static isFunction(value: unknown): value is Function;
    /**
     * isString 是否字符串
     * @param {String} value
     * @return {Boolean}
     */
    static isString(value: unknown): value is string;
    /**
     * isObject 是否对象
     * @param {Object} value
     */
    static isObject(value: unknown): value is Record<any, any>;
    /**
     * isClass 是否类
     * @param value
     */
    static isClass(value: unknown): boolean;
}
