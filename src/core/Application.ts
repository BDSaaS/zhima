import Config from '../../package.json'
import Container from './Container/Container'
import Exception from './Libs/Exception'
import Lib from './Libs/Lib'
import {IApplicationInstance, ILifecycle} from './Type/Interface'
import {UtilityClass, UtilityFunction, UtilityObject, UtilityWeakMap} from './Type/utility'

/**
 * Application 核心应用
 * @extends Container
 * @author SunnyXu <xy@ztes.com>
 */
export default class Application extends Container {
  // VERSION
  private static VERSION = '0.0.1'
  // Adapters 适配器
  private adapters: UtilityWeakMap = new WeakMap()
  // Providers 服务提供者
  private providers: any[] = []
  // Services 服务 :todo 改造服务
  private services: any[] = []

  /**
   * Get version
   * 版本
   * @return {String} version
   */
  public get version(): string {
    return Application.VERSION
  }

  /**
   * lifecycle
   * 生命周期
   * @private
   */
  private static lifecycle(): ILifecycle {
    return {
      // created
      created: () => {
        Application.registerProviders(Application.getProviders())
        Application.registerProviders(Application.getConfig('APP_CONFIG')['PROVIDERS'])
      },
      // mounted
      mounted: () => {
        // console.log('PDD Mounted')
      },
      // unmounted
      unmounted: () => {
        // console.log('PDD Unmounted')
      },
    }
  }

  /**
   * getterProviders Providers 获取器
   */
  public getterProviders(): any[] {
    const providers = this.providers
    return Array.isArray(providers) && providers.length > 0 ? providers : []
  }

  /**
   * getProviders
   * 获取
   * @protected
   */
  private static getProviders(): any[] {
    return Application.getInstance().getterProviders()
  }

  /**
   * setterProviders Providers
   * 设置器
   * @param providers
   */
  public setterProviders<T>(providers: T[]): void {
    const instanceProviders = this.providers
    if (Array.isArray(instanceProviders)) {
      this.providers = instanceProviders.filter((instanceProvider) => {
        const hasProvider = providers.find((provider) => {
          return instanceProvider === provider
        })
        return !hasProvider
      })
      this.providers = this.getterProviders().concat(providers)
    }
  }


  /**
   * setProviders
   * 设置
   * @param providers
   */
  public static setProviders<T>(providers: T[]): void {
    Application.getInstance().setterProviders(providers)
  }

  /**
   * registerProvider
   * 注册
   * @param provider
   * @param payload
   */
  public static registerProvider(provider: UtilityClass, payload?: Record<any, any>) {
    if (!Lib.isClass(provider)) {
      throw new Exception('Provider Error', 'The first argument must be a class')
    }
    console.log('TP------------S', provider, payload)
    new provider(Application.getInstance()).register(payload)
  }

  /**
   * registerProviders
   * 批量注册
   * @param providers
   */
  public static registerProviders(providers: any[]) {
    console.log('TP------------', providers)
    if (Array.isArray(providers)) {
      providers.map((provider) => {
        Application.registerProvider(provider)
      })
    }
  }

  /**
   * config
   * 配置
   * @param {Object} config
   * @param {String} name
   */
  public static setConfig(name: string, config: UtilityObject): void {
    // singleton
    Application.getInstance().singleton(name, config)
  }

  /**
   * getConfig
   * 获取
   * @param name
   * @param {Object} def 默认值
   */
  public static getConfig(name: string, def?: any): UtilityObject {
    if (!Application.getInstance().has(name)) {
      if (!Lib.isEmpty(def)) {
        return def
      }
      throw new Exception('Application Config Error', 'Configuration information does not exist')
    }
    return Application.getInstance().get(name)
  }

  /**
   * setAppConfig
   * 设置App配置
   * @param config
   */
  public static setAppConfig(config: UtilityObject): void {
    Application.setConfig('APP_CONFIG', config)
  }

  /**
   * getAppConfig
   * 获取App配置
   * @param name
   */
  public static getAppConfig(name: string) {
    return Application.getConfig('APP_CONFIG', {})[name]
  }

  /**
   * bindAdapter
   * 绑定
   * @param adapter
   * @param payload
   */
  public static bindAdapter(adapter: UtilityClass, payload?: UtilityObject) {
    // Application.getInstance().providers
    if (!Lib.isClass(adapter)) {
      throw new Exception('Adapter Error', 'The first argument must be a class')
    }
    console.log('TEST', adapter, payload)
    const instance = !Lib.isEmpty(payload) ? new adapter(payload) : new adapter()
    // Insert
    Application.getInstance().setterAdapter(adapter, instance)
  }

  /**
   * setAdapter
   * 新增
   * @param adapter
   * @param instance
   * @protected
   */
  public setterAdapter(adapter: UtilityClass, instance: UtilityObject) {
    if (!Lib.isClass(adapter)) {
      throw new Exception('Adapter Error', 'The first argument must be a class')
    }
    if (Application.getAdapter(adapter)) {
      throw new Exception('Adapter Error', 'The adapter is already bound')
    }
    this.adapters.set(adapter, instance)
  }

  /**
   * static getAdapter
   * 获取适配器
   * @param adapter 必须是个类
   * @return instance
   */
  public static getAdapter(adapter: UtilityClass) {
    if (!Lib.isClass(adapter)) {
      throw new Exception('Adapter Error', 'The argument must be a class')
    }
    return Application.getInstance().getterAdapter(adapter)
  }

  /**
   * static getAdapter
   * 适配器 获取器
   * @param adapter
   */
  public getterAdapter(adapter: UtilityFunction) {
    return this.adapters.get(adapter)
  }

  /**
   * getInstance
   * 获取实例
   */
  private static getInstance(): IApplicationInstance {
    let instance: Record<string, any> = Application.instance
    if (!instance || !(instance instanceof Application)) {
      instance = Application.instance = new Application()
    }
    return instance.proxyInstance()
  }

  /**
   * getService
   * 获取服务实例
   * @param serviceName
   */
  public static getService<T>(serviceName: string): T {
    return Application.getInstance().get(serviceName)
  }

  /**
   * App run
   * 框架应用运行
   * @param callback
   */
  public static run(callback?: UtilityFunction) {
    const boot = Application.lifecycle()
    boot.created()
    boot.mounted()
    boot.unmounted()
    if (Lib.isFunction(callback)) {
      callback()
    }
    console.log(`${'\n'} %c pdd %c ${Config.version} ${'\n'}`,
      'color: #fadfa3; background: #030307; padding:5px 0;border-radius:3px 0 0 3px;',
      'color:#000000;background: #ebd29a; padding:5px 0;border-radius:0 3px 3px 0;')
  }
}
