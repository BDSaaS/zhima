import { Lib } from "../index";
export default class Transformer {
    /**
     * Constructor
     * @param {String|Object|Array} data
     * @param {Object} payload
     */
    constructor(data, payload) {
        // Data
        this.data = data;
        // Payload
        this.payload = payload;
    }
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
    static create(data, callback) {
        // Callback is Function
        if (data && Lib.isFunction(callback)) {
            this.transform(data, callback);
        }
        return data;
    }
    /**
     * 转换方法
     * @param data
     * @param transform
     */
    static transform(data, transform) {
        if (Array.isArray(data)) {
            return data.map((item) => {
                return transform(item);
            });
        }
        return transform(data);
    }
}
//# sourceMappingURL=Transformer.js.map