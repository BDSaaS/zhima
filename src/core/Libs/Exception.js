/**
 * Exception Class
 * 目前原生的错误类型
 * Error [一般错误类型]
 * SyntaxError [语法错误]
 * ReferenceError [不存在的变量]
 * RangeError [超出有效范围]
 * TypeError [非预期类型]
 * URIError [URI参数错误]
 * EvalError [eval函数没有正确执行]
 * Example: throw new Exception() catch(error) error.name,error.message,error.code,error.stack
 */
export default class Exception extends Error {
    /**
     *
     * @param {String} name 错误名称
     * @param {String} message 错误提示
     * @param {Number} code 错误码
     */
    constructor(name, message, code = 500) {
        super(message);
        // 错误名称
        this.name = 'Error';
        // 错误信息
        this.message = 'Error message';
        // 错误码
        this.code = 500;
        this.name = name !== null && name !== void 0 ? name : 'Error';
        this.message = message !== null && message !== void 0 ? message : 'Error message';
        this.code = code !== null && code !== void 0 ? code : 500;
    }
}
//# sourceMappingURL=Exception.js.map