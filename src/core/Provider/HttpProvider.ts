import ServiceProvider from './ServiceProvider'
import HttpService from '../Service/HttpService'
import Lib from '../Libs/Lib'
import Exception from '../Libs/Exception'
import Application from '../Application'

export default class HttpProvider extends ServiceProvider {
  /**
   * Method Register
   * 注册服务
   * @protected
   */
  protected register(): void {
    // Http adapter , Default is AxiosAdapter
    const HTTP_ADAPTER = Application.getAppConfig('HTTP_CONFIG')['HTTP_ADAPTER']

    // Http lib , Default is Axios.js
    const HTTP_LIB = Application.getAppConfig('HTTP_CONFIG')['HTTP_LIB']

    // Http api Api配置
    const HTTP_API = Application.getAppConfig('HTTP_CONFIG')['HTTP_API']

    // Http host
    // Maybe Is Function
    const HTTP_HOST = Lib.isFunction(Application.getAppConfig('HTTP_CONFIG')['HTTP_HOST']) ? Application.getAppConfig(
      'HTTP_CONFIG')['HTTP_HOST']() : Application.getAppConfig('HTTP_CONFIG')['HTTP_HOST']

    // Use RESTful , Default is True
    const IS_RESTFUL = Application.getAppConfig('HTTP_CONFIG')['IS_RESTFUL']

    // Content-type , Default is REQUEST_PAYLOAD
    const CONTENT_TYPE = Application.getAppConfig('HTTP_CONFIG')['CONTENT_TYPE']

    // Data carrying 数据携带
    const DATA_CARRYING = Application.getAppConfig('HTTP_CONFIG')['DATA_CARRYING']

    if (HTTP_ADAPTER && HTTP_LIB) {
      // Bind Axios
      Application.bindAdapter(HTTP_ADAPTER, HTTP_LIB)
    } else {
      // Error
      throw new Exception('ADAPTER Error', 'Bind http adapter error')
    }

    // Http Adapter 适配器
    const HTTP_ADAPTER_ = Application.getAdapter(HTTP_ADAPTER) as any

    // Http Request Middleware 请求中间件
    const REQUEST_MIDDLEWARE = Application.getAppConfig('HTTP_CONFIG')['REQUEST_MIDDLEWARE']

    // Http Response Middleware 响应中间件
    const RESPONSE_MIDDLEWARE = Application.getAppConfig('HTTP_CONFIG')['RESPONSE_MIDDLEWARE']

    // Singleton register
    this.app.singleton('$request', () => {
      // Http service
      const obj = new HttpService(this.app, {
        HTTP_ADAPTER_,
        // 请求别名关联具体请求地址、请求方法、请求凭据携带状况
        HTTP_API,
        // 请求主机地址
        HTTP_HOST,
        // 是否RESTful模式
        IS_RESTFUL,
        // 请求类型
        CONTENT_TYPE,
        // 携带参数
        DATA_CARRYING,
        // 请求中间件
        REQUEST_MIDDLEWARE,
        // 响应中间件
        RESPONSE_MIDDLEWARE,
      })
      // return httpCreate;
      return obj
    })
  }

}
