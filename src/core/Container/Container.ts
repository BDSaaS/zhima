import Exception from '../Libs/Exception'
import Lib from '../Libs/Lib'
import {IContainer} from '../Type/Interface'
import {UtilityClass, UtilityFunction} from '../Type/utility'

/**
 * Class Container
 * 容器类
 * @author SunnyXu <xy@ztes.com>
 */
export default class Container implements IContainer {
  // instance 实例
  protected static instance: any
  // instance 实例集
  protected instances = new Map()
  // bind 绑定集
  protected bindings: Record<string, any> = {}
  // alias 别名集
  protected aliases: Record<string, any> = {}

  /**
   * bind 绑定实体
   * @param {String|Array} abstract
   * @param {*} concrete
   */
  public bind(abstract: string | string[], concrete: any) {
    // null
    if (!abstract) {
      throw new Exception('Abstract Error', 'Abstract not null')
    }
    // abstract为数组
    if (Array.isArray(abstract)) {
      abstract.map((abs) => {
        this.bind(abs, concrete)
      })
      return
    }
    // abstract不为字符串
    if (!Lib.isString(abstract)) {
      throw new Exception('Abstract Error', 'The abstract name is a string')
    }
    // concrete类型
    if (Lib.isObject(concrete) || Lib.isClass(concrete)) {
      this.bindings[abstract] = concrete
    } else if (Lib.isFunction(concrete) && !Lib.isClass(concrete)) {
      // this.instances[abstract] = concrete
      this.instances.set(abstract, concrete)
    }
  }

  hasInstance() {

  }

  /**
   * make 创建类的实例/获取对象 create instance/object
   * @param abstract
   * @param params
   * @param shared
   */
  public make(abstract: string, params?: object | [], shared = false) {
    // 获取 abstract别名
    abstract = this.getAlias(abstract)
    // abstract 不存在
    if (!this.has(abstract)) {
      throw new Exception('Container Error', 'The abstract does not exist')
    }
    // executor 待执行
    // const executor = this.bindings[abstract]
    const executor = this.instances.get(abstract) || this.bindings[abstract]
    // executor 处理
    if (Lib.isClass(executor)) {
      return this.makeClass(abstract, executor, params, shared)
    } else if (Lib.isFunction(executor)) {
      return this.makeFunc(abstract, executor, params, shared)
    }
    return executor
  }

  // /**
  //  * instance 实例
  //  * @param {String} abstract
  //  * @param instance
  //  */
  // instance(abstract: string, instance) {
  //     // 存在标记
  //     const has = this.has(abstract)
  //     if (has) {
  //         delete this.instances[abstract]
  //     }
  //     this.instances[abstract] = instance
  // }

  /**
   * makeClass 创建类
   * @param name
   * @param executor
   * @param params
   * @param shared
   */
  protected makeClass(name: string, executor: UtilityClass, params: any, shared = false) {
    const func = () => {
      return new executor(params)
    }
    if (shared) {
      this.bind(name, func)
      // return this.instances[name]
      return this.instances.get(name)
    }
    return func
  }

  /**
   * makeFunc 创建函数
   * @param name
   * @param executor
   * @param params
   * @param shared
   * @protected
   */
  protected makeFunc(name: string, executor: UtilityFunction, params: any, shared = false) {
    const func = executor(params)
    if (shared) {
      this.bind(name, func)
      // return this.instances[name]
      return this.instances.get(name)
    }
    return func
  }

  /**
   * has as existence
   * 是否存在标识 existence 的别名
   * @param {String} name
   */
  public has(name: string): boolean {
    return this.existence(name)
  }

  /**
   * existence 存在标识
   * @param {String} name
   */
  public existence(name: string): boolean {
    // return !this.bindings[name] || !this.instances[name] || !this.getAlias(name)
    return !this.bindings[name] || !this.instances.get(name) || !this.getAlias(name)
  }

  /**
   * getAlias 获取别名
   * @param abstract
   */
  getAlias(abstract: string) {
    const alias = this.aliases[abstract]
    return alias || abstract
  }

  /**
   * get 获取实例
   * @param abstract
   */
  public get(abstract: string) {
    if (!this.has(abstract)) {
      throw new Exception('Container Error', 'The abstract does not exist')
    }
    return this.make(abstract)
  }

  /**
   * singleton 单例
   * @param abstract
   * @param concrete
   */
  public singleton(abstract: string, concrete: any) {
    this.bind(abstract, concrete)
  }

  /**
   * setInstance 设置实例
   * @param {Record<string, any>} instance
   */
  public setInstance<T>(instance: T) {
    Container.instance = instance
  }

  /**
   * getInstance 获取实例
   *
   */
  public getInstance() {
    let instance: Record<string, any> = Container.instance
    if (!instance || !(instance instanceof Container)) {
      instance = Container.instance = new Container()
    }
    return instance.proxyInstance()
  }

  /**
   * proxyInstance 代理实例
   *
   */
  protected proxyInstance(): this {
    return new Proxy(this, {
      get: (target, propKey) => {
        // @ts-ignore :todo 目前不清楚怎么处理，尴尬.. TS还得继续学习
        return target[propKey]
      },
    })
  }

}
