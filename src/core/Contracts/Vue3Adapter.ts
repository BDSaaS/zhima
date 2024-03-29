import Lib from '../Libs/Lib'
import Exception from '../Libs/Exception'

interface CreateApp {
  template: string
}

interface InjectionKey<T> extends Symbol {
}

type PluginInstallFunction = (app: AppInterface, ...options: any[]) => any;

interface AppInterface {
  version: string
  config: Record<any, any>

  /**
   * use
   * @param plugin
   * @param options
   */
  use(plugin: PluginInstallFunction, ...options: any[]): this

  /**
   * mixin
   * @param config
   */
  mixin(config: Record<any, any>): void

  /**
   * component 组件注册
   * @param name 组件名称
   * @param config 组件配置
   */
  component(name: string, config: any | Record<any, any>): any

  /**
   * directive 指令注册
   * @param name
   * @param config
   */
  directive(name: string, config: any | Record<any, any>): any

  /**
   * mount 挂载
   * @param rootContainer
   */
  mount<T>(rootContainer: Element | string): T

  /**
   * unmount 卸载
   */
  unmount(): void

  /**
   * provide 提供(者)
   * @param key
   * @param value
   */
  provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
}

// type TVue3Adapter = typeof Vue3Adapter

export default class Vue3Adapter {
  // Class property
  private Vue: any
  private static app: AppInterface
  // Vue3 property
  // config: Record<any, any>
  // version: string

  directive(name: string, config: any): any {
    Vue3Adapter.app.directive(name, config)
  }

  mixin(config: Record<any, any>) {
    Vue3Adapter.app.mixin(config)
  }

  mount(root: string): any {
    return Vue3Adapter.app.mount(root)
  }

  provide<T>(key: InjectionKey<T> | string, value: T): AppInterface {
    return Vue3Adapter.app.provide(key, value)
  }

  unmount() {
    Vue3Adapter.app.unmount()
  }

  use(plugin: any, ...options: any[]): ReturnType<AppInterface['use']> {
    return Vue3Adapter.app.use(plugin, options)
  }

  constructor($class: any) {
    if (Lib.isClass($class)) {
      throw new Exception('Adapter Error', 'The first argument must be a class')
    }
    this.Vue = $class
  }

  createApp(config: CreateApp) {
    // 因为 private static app 所以 无需判断来源了，但是编译成js后还是有被注入风险
    if (!Vue3Adapter.app) {
      Vue3Adapter.app = this.Vue.createApp(config)
    }
    return Vue3Adapter.app
  }

  component(name: string, config: any | Record<any, any>) {
    Vue3Adapter.app.component(name, config)
  }

  run(root: string) {
    Vue3Adapter.app.mount(root)
  }
}
