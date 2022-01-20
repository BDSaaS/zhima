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
    public static is(source: any, rule: any) {
        if (!rule) {

        }
        if (Validator.isString(source)) {

        } else if (Validator.isNumber(source)) {

        }
    }

    public static form(source: any, rule: any, message: any) {

    }

    public gotKeys(obj:Record<string, any>) {
        
    }

    createData() {
        return {
            type: 'string',

            message: 'message'
        }
    }

    /**
     * typeOf
     * 类型
     * @param {*} value
     */
    public static typeOf(value: any): string {
        return typeof value;
    }

    /**
     * getTag
     * 处理类型
     * @param {*} value
     */
    public static getTag(value: any): string {
        return Object.prototype.toString.call(value);
    }

    /**
     * isString
     * 是否字符串
     * @param {String} value
     * @return {Boolean}
     */
    public static isString(value: any): boolean {
        return Validator.typeOf(value) === 'string' || (Validator.typeOf(value) === 'object' && Validator.getTag(value) == '[object String]');
    }

    /**
     * isNumber
     * 是否数字
     * @param value
     * @return {Boolean}
     */
    public static isNumber(value: any): boolean {
        return Validator.typeOf(value) === 'number' || (Validator.typeOf(value) === 'object' && Validator.getTag(value) == '[object Number]');
    }
}
