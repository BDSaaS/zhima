/**
 * Validator Class
 * 验证器
 * 变量的单独校验
 * 对象的属性和方法校验
 */
export default class Validator {
    /**
     *
     * @param source
     * @param rule
     * 以下示例
     * {type:'string'|'number'|'boolean'|'date'|'method'|'email'|'float'|'int'|'any'}
     * [{name:'username',type:'string'},{name:'password'}]
     */
    static is(source: any, rule: any): void;
    static form(source: any, rule: any, message: any): void;
    gotKeys(obj: Record<string, any>): void;
    createData(): {
        type: string;
        message: string;
    };
    /**
     * typeOf
     * 类型
     * @param {*} value
     */
    static typeOf(value: any): string;
    /**
     * getTag
     * 处理类型
     * @param {*} value
     */
    static getTag(value: any): string;
    /**
     * isString
     * 是否字符串
     * @param {String} value
     * @return {Boolean}
     */
    static isString(value: any): boolean;
    /**
     * isNumber
     * 是否数字
     * @param value
     * @return {Boolean}
     */
    static isNumber(value: any): boolean;
}
