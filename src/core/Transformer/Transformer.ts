export default class Transformer {

    constructor(data) {

    }

    /**
     * new Transformer.create([{}],(data)=>{
     *     return {
     *         name:data.name1,
     *         age:data.age,
     *         name-age:`${name}-${age}`
     *     }
     * })
     * 处理简单数据
     * @param data
     */
    public static create(data, callback) {

    }

    public handle(data) {
        if (Array.isArray(data)) {
            return data.map((item) => {
                return Transformer.transform(item)
            })
        }
        return Transformer.transform(data)
    }

    public static transform(data) {
        return data
    }
}
