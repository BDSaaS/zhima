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
    name: string;
    message: string;
    code: number;
    /**
     *
     * @param {String} name 错误名称
     * @param {String} message 错误提示
     * @param {Number} code 错误码
     */
    constructor(name: string, message: string, code?: number);
}
