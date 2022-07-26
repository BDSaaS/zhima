import Lib from "../Libs/Lib"

/**
 * Class Transformer 转换器
 * NewTransformer extends Transformer -> constructor(){super(data,payload)}
 */
export default class Transformer {
    private readonly data: any
    private payload: any

    /**
     * Method constructor
     * @param {*} data 需处理的数据
     * @param {*} payload 携带的载荷
     * @returns
     */
    constructor(data: any, payload: unknown) {
        // data
        this.data = data
        // payload
        this.payload = payload
    }

    /**
     * Method transform
     * 转换方法
     * @param {Object|String|Number} data
     * @returns
     */
    transform(data) {
        return data
    }

    /**
     * Method create
     * 创建新数据
     * @return {Array/Object|String|Number|*}
     */
    create() {
        if (Array.isArray(this.data)) {
            return this.data.map((item) => {
                return this.transform(item)
            })
        } else {
            return this.transform(this.data)
        }
    }

    /**
     * 格式化数字
     * @param {String|Number} number 待处理数字
     * @param {Number} places 小数点位数 -1为原样保留
     * @param {String} thousand 千位字符串 默认为空
     * @param {String} decimal 小数点替换字符 默认为.
     * @return {String|Number}
     */
    formatNumber(number: any, places: number | string = -1, thousand = '', decimal = '.') {
        // 只处理正常数字
        if (typeof number !== 'number') {
            // 处理数字字符
            number = Lib.typeOf(number, 'string') ? parseFloat(number) : 0
        }
        // 得到正常的数字
        number = isNaN(number) ? 0 : number
        const numSplit = number.toString().split('.')
        // 为-1时为保留当前数字的自带有效位数 注意 如果parseInt的参数不是字符串，则会先转为字符串再转换。
        places = parseInt(places as string)
        places = !isNaN(Math.abs(places)) && places !== -1 ? Math.abs(places) : -1
        // 保留原有小数点位数
        if (numSplit[1] && places === -1) {
            places = numSplit[1].length
        } else if (!numSplit[1] && places === -1) {
            places = 0
        }
        // 千位标记
        thousand = typeof thousand == 'string' ? thousand : ','
        // 小数点标记
        decimal = decimal || '.'
        // 符号
        let negative = number < 0 ? '-' : ''
        let i, j
        // 10进制
        i = parseInt((number = Math.abs(+number || 0).toFixed(places as number)), 10).toString()
        j = (j = i.length) > 3 ? j % 3 : 0
        // 处理后数据
        return (negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g,
            '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places as number).slice(2) : ''))
    }

    /**
     * formatDate 日期格式化
     * @param {string|number} timestamp
     * @returns
     */
    formatDate(timestamp: number | string | unknown = Date.now()): Record<string, number | string> {
        // 参数不是数字说明发过来的已经是格式化的时间
        if (Lib.typeOf(timestamp, 'string')) {
            // 为字符串时且为可解析时间日期字符串即满足RFC2822和ISO8061标准
            if (!isNaN(Date.parse(timestamp as string))) {
                // 返回不带毫秒的时间戳
                return this.formatDate(Date.parse(timestamp as string))
            }
            return this.formatDate()
        }
        const date = new Date(timestamp as number)
        let Y = date.getFullYear()
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        // 星期
        let weekIndex = date.getDay()
        let weeks = {
            '0': '日',
            '1': '一',
            '2': '二',
            '3': '三',
            '4': '四',
            '5': '五',
            '6': '六',
        }
        let ap = date.getHours() >= 0 && h < 12 ? 'AM' : 'PM'
        let apCn = date.getHours() >= 0 && h < 12 ? '上午' : '下午'
        // 返回JSON格式时间
        return {
            Y: Y.toString(),
            M: M.toString(),
            D: D.toString(),
            h: h.toString(),
            m: m.toString(),
            s: s.toString(),
            week: weeks[weekIndex],
            ap: ap,
            apCn: apCn
        }
    }
}
