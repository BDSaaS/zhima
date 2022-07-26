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
    static is(source, rule) {
        if (!rule) {
        }
        if (Validator.isString(source)) {
        }
        else if (Validator.isNumber(source)) {
        }
    }
    static form(source, rule, message) {
    }
    gotKeys(obj) {
    }
    createData() {
        return {
            type: 'string',
            message: 'message'
        };
    }
    /**
     * typeOf
     * 类型
     * @param {*} value
     */
    static typeOf(value) {
        return typeof value;
    }
    /**
     * getTag
     * 处理类型
     * @param {*} value
     */
    static getTag(value) {
        return Object.prototype.toString.call(value);
    }
    /**
     * isString
     * 是否字符串
     * @param {String} value
     * @return {Boolean}
     */
    static isString(value) {
        return Validator.typeOf(value) === 'string' || (Validator.typeOf(value) === 'object' && Validator.getTag(value) == '[object String]');
    }
    /**
     * isNumber
     * 是否数字
     * @param value
     * @return {Boolean}
     */
    static isNumber(value) {
        return Validator.typeOf(value) === 'number' || (Validator.typeOf(value) === 'object' && Validator.getTag(value) == '[object Number]');
    }
}
//# sourceMappingURL=Validator.js.map