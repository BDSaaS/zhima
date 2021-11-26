export default class Lib {
    /**
     * typeOf 类型
     * @param {*} value
     */
    static typeOf(value): string {
        return typeof value;
    }

    /**
     * getTag 处理类型
     * @param {*} value
     */
    static getTag(value): string {
        return Object.prototype.toString.call(value);
    }

    /**
     * isFunction 是否函数
     * @param {Function} value
     */
    static isFunction(value): boolean {
        return Lib.typeOf(value) === 'function';
    }

    /**
     * isString 是否字符串
     * @param {String} value
     */
    static isString(value: string): boolean {
        return Lib.typeOf(value) === 'string' || (Lib.typeOf(value) === 'object' && value != null && !Array.isArray(value) && Lib.getTag(value) == '[object String]');
    }

    /**
     * isObject 是否对象
     * @param {Object} value
     */
    static isObject(value: object): boolean {
        return Lib.getTag(value) === '[object Object]';
    }

    /**
     * isClass 是否类
     * @param value
     */
    static isClass(value): boolean {
        // isFunction
        if (!Lib.isFunction(value)) {
            return false;
        }
        // Function toString
        const str = value.toString();
        // async function or arrow function
        if (value.prototype === undefined) return false;
        // generator function or malformed definition
        if (value.prototype.constructor !== value) return false;
        // ES6 class
        if (str.slice(0, 5) == "class") return true;
        // has own prototype properties
        if (Object.getOwnPropertyNames(value.prototype).length >= 2) return true;
        // anonymous function
        if (/^function\s+\(|^function\s+anonymous\(/.test(str)) return false;
        // Other
        return false;
    }
}
