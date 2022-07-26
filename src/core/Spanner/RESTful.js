/**
 * Class RESTful
 * RESTful处理类
 * @author SunnyXu <xy@ztes.com>
 */
export default class RESTful {
    constructor(uri, data, type) {
        // RESTful 类型
        this.type = true;
        if (!type) {
            this.setData({
                uri,
                data
            });
            return this;
        }
        // Parameters without RESTful
        if (!this.checkUri.status) {
            return this;
        }
        // Make 制作一个RESTful的uri和data
        this.make();
        return this;
    }
    setData({ uri, data }) {
        this.sendData = { uri, data };
    }
    get data() {
        return this.sendData;
    }
    get checkUri() {
        const check = this.data.uri.match(/<(.*?)>/g);
        return {
            status: !!check,
            data: check
        };
    }
    make() {
        // All keys data里的全部key
        const keys = Object.keys(this.data);
        // RESTful parameters key=>val 获取RESTful data里的key和val
        const restParameters = {};
        // Remaining parameters key=>val 获取非RESTful data里的key和val
        const remainingParameters = {};
        keys.map((key) => {
            // 是否包含__字符，包含__字符的为RESTful指定替换参数
            const isMatch = key.match(/^__/g);
            // isMatch 处理data里数据
            if (isMatch) {
                // 将__字符替换
                let newKey = key.replace(/^__/g, "");
                restParameters[newKey] = this.data[key];
            }
            else {
                remainingParameters[key] = this.data[key];
            }
        });
        // Uri default 含有默认值的uri
        const defaultValue = {};
        // Default val
        const uriData = this.checkUri.data.map((arg) => {
            let str = arg.replace(/(^<)|(>$)/g, "");
            const argArr = str.split("=");
            if (argArr.length === 2) {
                defaultValue[argArr[0]] = argArr[1];
            }
            else {
                defaultValue[arg] = null;
            }
        });
        // Assign uri data
        const _parameters = Object.assign(defaultValue, restParameters);
        // //
        // let uri = this.data.uri;
        // _parameters.map((parameter)=>{
        //     uri.replace(`<${parameter}>`, _parameters[parameter])
        // })
    }
}
//# sourceMappingURL=RESTful.js.map