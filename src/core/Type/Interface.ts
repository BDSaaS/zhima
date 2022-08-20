import {UtilityClass, UtilityFunction, UtilityObject, UtilityWeakMap} from './utility'

export interface ILifecycle {
  created(): any

  mounted(): any

  unmounted(): any
}

export interface IApplicationInstance extends IContainer {
  // providers: any[]
  // adapters: UtilityWeakMap
  // services: any[]

  // lifecycle(): ILifecycle

  // getProviders(): any[]

  getterProviders(): any[]

  setterProviders<T>(providers: T[]): void

  getterAdapter<T>(adapter: UtilityClass | T): T

  setterAdapter(adapter: UtilityClass, instance: UtilityObject): void

  // getConfig(name: string, def?: any): UtilityObject

  // setConfig(name: string, config: UtilityObject): void


  get(service: string): any
}

export interface IContainer {
  // instance: any
  // instances: Map<any, any>
  // bindings: Record<any, any>
  // aliases: Record<any, any>

  bind(abstract: string | string[], concrete: any): void

  // make(abstract: string, params?: object | [], shared?: boolean)

  // makeClass(name, executor, params: object | any[], shared?: boolean)

  // makeFunc(name: string, executor, params, shared?: boolean)

  // 是否存在 existence 别名
  has(name: string): boolean

  // existence
  existence(name: string): boolean

  //
  // getAlias(abstract: string)
  //
  // get(abstract: string)

  singleton(abstract: string, concrete: any): void

  setInstance<T>(instance: T): void

  getInstance(): this

  // proxyInstance(): this
}

interface IService {
  '$helper': IHelper
}

export type TGetServiceType<T, K> = K extends keyof IService ? Pick<IService, K> : T

//
type TResponseDataReturn = { statusCode: number, msg: string, data: any, timestamp: number }

interface IResponseReturn extends Response {
  data: TResponseDataReturn
}

// 助手函数
export interface IHelper {
  env(): Record<any, any>

  storage(name: string): Record<any, any>

  storage(name: string, payload?: any): void

  cookies(name: string): Record<any, any>

  cookies(name: string, payload?: any): void

  session(name: string): Record<any, any>

  session(name: string, payload?: any): void

  /**
   * 发送一个http请求
   * @param api 接口key
   * @param data  请求数据
   * @param handle 处理Response的函数
   */
  http(api: string, data?: UtilityObject, handle?: (response: IResponseReturn) => void): Promise<TResponseDataReturn>

  send(api: string, data?: UtilityObject, handle?: UtilityFunction, config?: IHelper): Promise<IResponseReturn>
}

// 请求方法
export type TRequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'
//
export type TContentType = 'REQUEST_PAYLOAD' | 'FORM_DATA'

export type TCarryData = 'REQUEST_HEADERS' | 'REQUEST_DATA'

export type TApiRoute = [string, TRequestMethod?, boolean?]

export interface IHttpSendConfig {
  host?: string
  headers?: Record<string, any>
  mode?: TContentType
  responseData?: boolean
}

/**
 * Adapter Interface
 */
export type IHttpConfig = {
  method: TRequestMethod
  url: string
  data: Record<string, any>
  headers: Record<string, any>
}

// Http 适配器类型 通用
export type IHttpAdapter = <T>(config: IHttpConfig) => Promise<T>

/**
 * Http Service
 */

export type THttpServiceParams = {
  HTTP_ADAPTER_: IHttpAdapter,
  HTTP_API: Record<string, any>,
  HTTP_HOST: string,
  IS_RESTFUL: boolean,
  CONTENT_TYPE: TContentType,
  DATA_CARRYING: UtilityObject,
  REQUEST_MIDDLEWARE: UtilityFunction,
  RESPONSE_MIDDLEWARE: UtilityFunction,
}


/**
 * Service Interface
 */

export interface IHttpService {
  send(apiRoute: string, data: Record<string, any>, config?: IHttpSendConfig, returnResponse?: boolean): Promise<any>
}
