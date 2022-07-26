export default class Transformer {
    private data;
    private payload;
    /**
     * Constructor
     * @param {String|Object|Array} data
     * @param {Object} payload
     */
    constructor(data: any, payload: any);
    /**
     * new class Transformer.create([{}],(data)=>{
     *     return {
     *         name:data.name1,
     *         age:data.age,
     *         name-age:`${name}-${age}`
     *     }
     * })
     * 处理简单数据
     * @param data
     * @param callback {Function}
     */
    static create(data: any, callback: Function): any;
    /**
     * 转换方法
     * @param data
     * @param transform
     */
    static transform(data: any, transform: Function): any;
}
