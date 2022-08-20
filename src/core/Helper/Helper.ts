/**
 * Class Helper
 * 助手函数
 */
import Exception from '../Libs/Exception'
import WebStorage from './Storage/WebStorage'
import Service from '../Service/Service'
import Lib from '../Libs/Lib'
import {UtilityFunction, UtilityObject} from '../Type/utility'
import {IHelper, IHttpSendConfig, IHttpService} from '../Type/Interface'
import Application from '../Application'

/**
 * Class Helper
 * @extends Service
 */
export default class Helper extends Service implements IHelper {

  public env(): Record<any, any> {
    return {}
  }

  private webStorage(type: 'localStorage' | 'sessionStorage', name?: string, payload?: any): any | Record<any, any> {
    const storage = new WebStorage({type: type})
    if (name && !Lib.isString(name)) {
      throw new Exception('WebStorage Error', 'The first argument must be a string')
    } else if (typeof name === 'undefined' && !Lib.isString(name)) {
      return storage.getAll()
    }
    if (typeof payload === 'undefined') {
      return storage.get(name)
    }
    storage.save(name, payload)
  }

  /**
   * Local storage
   * @param name
   * @param payload
   */
  public storage(name?: string, payload?: any): any | Record<any, any> {
    return this.webStorage('localStorage', name, payload)
  }

  public cookie() {

  }

  /**
   * Session storage
   * @param name
   * @param payload
   */
  public session(name?: string, payload?: any): any | Record<any, any> {
    return this.webStorage('sessionStorage', name, payload)
  }


  /**
   * Method http
   * 发起一个http请求
   * @param api
   * @param data
   * @param handle
   */
  // @ts-ignore
  public async http(api: string, data: UtilityObject, handle?: UtilityFunction): Promise<any> {
    try {
      return await this.send(api, data, handle, {}, false)
    } catch (e) {
      new Exception('HttpError', '')
    }
  }

  /**
   * 发送一个Http请求
   * @param api
   * @param data
   * @param handle
   * @param config
   * @param returnResponse
   */
  // @ts-ignore
  public async send(api: string, data: UtilityObject, handle?: UtilityFunction, config?: IHttpSendConfig, returnResponse?: boolean): Promise<any> {
    if (!this.app.has('$request')) {
      throw new Exception('RequestService Error', '')
    }
    const response = await Application.getService<IHttpService>('$request').send(api, data, config)
    if (Lib.isFunction(handle)) {
      handle(response)
    }
    return returnResponse ? response : response.data
  }

  public checkAuth(): void {

  }
}
