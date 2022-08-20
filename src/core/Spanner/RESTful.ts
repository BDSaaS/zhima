import {UtilityObject} from '../Type/utility'

/**
 * Class RESTful
 * RESTful处理类
 * @author SunnyXu <xy@ztes.com>
 */

export default class RESTful {
  // 是否为RESTful模式
  private isRESTful: boolean = true
  // 请求的物理地址
  private uri: string
  // 请求携带的数据
  private requestData: any

  /**
   * Method constructor
   * @param {String} uri
   * @param {*} data
   * @param {*} mode
   * @returns
   */
  constructor(uri: string, data: any, mode: boolean) {
    this.isRESTful = mode ?? this.isRESTful
    this.uri = uri
    this.requestData = data
  }

  /**
   * Method create
   * 创建RESTful数据
   */
  create() {
    if (!this.isRESTful) {
      return {
        uri: this.uri,
        data: this.requestData,
      }
    }
    // Transformer
    return this.transformer()
  }

  /**
   *  private method transformer
   */
  private transformer() {
    // 传入数据里的Keys
    let dataKeys = Object.keys(this.requestData)
    // 参与替换的Key
    let dataArgs: UtilityObject = {}
    // 不参与替换的Key 后续有用
    let dataNotArg: UtilityObject = {}
    dataKeys.map((item) => {
      // 是否包含__字符，包含__字符的为RESTful指定参数
      let res = item.match(/^__/g)
      // 将__字符替换
      let arg = item.replace(/^__/g, '')
      // 包含__的字符
      if (res) {
        dataArgs[arg] = this.requestData[item]
      } else {
        dataNotArg[arg] = this.requestData[item]
      }
    })

    // 处理URI获取动态请求参数
    let args = this.uri.match(/<(.*?)>/g)

    // Unmatched 没有匹配
    if (!args) {

    }

    // 默认值
    let defaultArgs: UtilityObject = {}

    if (!args || !Array.isArray(args)) {
      // throw new Exception('The api route does not exist', 'ApiRouteError');
      return {uri: this.uri, data: this.requestData}
    } else {
      let argsMap = args.map((item) => {
        let arg = item.replace(/(^<)|(>$)/g, '')
        let argArr = arg.split('=')
        // 含默认值
        if (argArr.length === 2) {
          defaultArgs[argArr[0]] = argArr[1]
          return argArr[0]
        } else {
          defaultArgs[arg] = null
          return arg
        }
      })

      // 合并对象
      Object.assign(defaultArgs, dataArgs)

      // 去除默认值
      this.uri = this.uri.replace(/=(.*?)>/g, '>')

      argsMap.map((item) => {
        // 替换成新值
        this.uri = this.uri.replace(`<${item}>`, defaultArgs[item])
      })

      // 剩下的新数据
      // this._newData = dataNotArg
      return {uri: this.uri, data: dataNotArg}
    }

  }
}
