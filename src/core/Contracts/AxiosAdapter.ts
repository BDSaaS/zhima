import Exception from '../Libs/Exception'
import Lib from '../Libs/Lib'
import {IHttpAdapter, IHttpConfig, TRequestMethod} from '../Type/Interface'

/**
 * Class AxiosAdapter
 */
export default class AxiosAdapter {
  private http: IHttpAdapter
  private method: TRequestMethod = 'POST'
  private url = ''
  private data = {}
  private headers = {}

  /**
   * Method constructor 注入Axios
   * @param {*} $function
   * @returns
   */
  constructor($function: IHttpAdapter) {
    if (!Lib.isFunction($function)) {
      throw new Exception('Adapter Error', 'The first argument must be a function')
    }
    this.http = $function
    // return this
  }

  /**
   * Method setConfig
   * 设置配置信息
   * @param {method,url,data,headers} param
   */
  public setConfig({method, url, data, headers}: IHttpConfig) {
    this.method = method ?? this.method
    this.url = url ?? this.url
    this.data = data ?? this.data
    this.headers = headers ?? this.headers
  }

  /**
   * Method request
   * @returns Promise
   */
  request() {
    return new Promise((resolve, reject) => {
      this.http({
        method: this.method,
        url: this.url,
        data: this.data,
        headers: this.headers,
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })

  }
}
