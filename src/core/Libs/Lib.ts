// interface Person{
//     name: string
//     age: number
// }
//
// type Par<T> = {
//     [K in keyof T]?: T[K]
// }
//
// type PersonOptional = Partial<Person>
// type PersonReadonly = Readonly<Person>

type variableType = 'string' | 'number' | 'object' | 'undefined' | 'function' | 'boolean' | 'bigInt' | 'symbol'

export default class Lib {
    /**
     * typeOf 判断变量类型
     * @param value
     * @param type
     */
    static typeOf(value: unknown, type: variableType): boolean {
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
    public static isFunction(value: unknown): value is Function {
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
     * isObject 是否对象
     * @param {Object} value
     */
    public static isObject(value: unknown): value is Record<any, any> {
        return Lib.getTag(value) === '[object Object]'
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
        if ((value as FunctionConstructor).prototype === undefined) return false
        // generator function or malformed definition
        if ((value as FunctionConstructor).prototype.constructor !== value) return false
        // ES6 class
        if (str.slice(0, 5) == "class") return true
        // has own prototype properties
        if (Object.getOwnPropertyNames((value as FunctionConstructor).prototype).length >= 2) return true
        // anonymous function
        if (/^function\s+\(|^function\s+anonymous\(/.test(str)) return false
        // Other
        return false
    }
}
