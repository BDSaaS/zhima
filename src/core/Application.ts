import Container from "./Container/Container"
import Exception from "./Libs/Exception"
import Lib from "./Libs/Lib"

interface Instance {
    getInstance: Instance
}

interface Instance2 {

}

/**
 * Application 核心应用
 * @extends Container
 * @author SunnyXu <xy@ztes.com>
 */
export default class Application extends Container {
    // VERSION
    private static VERSION = '0.0.1'
    // Adapters
    private adapters = new WeakMap()
    // Providers
    private providers: any[] = []
    // Services
    private services: [] = []
    // Lifecycle step
    private step = 'init'

    /**
     * Get version 版本
     * @return {String} version
     */
    public get version(): string {
        return Application.VERSION
    }

    private lifecycle(): any {
        return {
            // create
            create: () => {
                if (this.step === 'init') {
                    this.step = 'beforeCreate'
                }
            },
            // created
            created: () => {
                this.step = 'created'
            },
            // mounted
            mounted: () => {
                this.step = 'mounted'
            },
            // unmounted
            unmounted: () => {
                this.step = 'unmounted'
            }
        }
    }

    /**
     * getProviders 获取
     * @protected
     */
    private static getProviders(): any[] {
        const providers = Application.getInstance().providers
        return Array.isArray(providers) && providers.length > 0 ? providers : []
    }


    /**
     * setProviders 设置
     * @param providers
     */
    private setProviders<T>(providers: T[]): void {
        const instanceProviders = Application.getInstance().providers
        if (Array.isArray(instanceProviders)) {
            Application.getInstance().providers = instanceProviders.filter((instanceProvider) => {
                const hasProvider = providers.find((provider) => {
                    return instanceProvider === provider
                })
                return !hasProvider
            })
            Application.getInstance().providers = Application.getInstance().getProviders().concat(providers)
        }
    }

    /**
     * registerProvider 注册
     * @param provider
     * @param payload
     */
    public registerProvider(provider, payload?: Record<any, any>) {
        if (!Lib.isClass(provider)) {
            throw new Exception('Provider Error', 'The first argument must be a class')
        }
        new provider(Application.getInstance()).register(payload)
    }

    /**
     * registerProviders 批量注册
     * @param providers
     */
    public registerProviders(providers: []) {
        if (Array.isArray(providers)) {
            providers.map((provider) => {
                this.registerProvider(provider)
            })
        }
    }

    /**
     * config 配置
     * @param {Object} config
     * @param {String} name
     */
    public static setConfig(config: {}, name: string = '$config'): void {
        // singleton
        this.prototype.singleton(name, config)
    }

    /**
     * getConfig 获取
     * @param name
     * @param {Object} def 默认值
     */
    public getConfig(name, def?: object) {
        if (!this.has(name)) {
            if (def) {
                return def
            }
            throw new Exception('Config Error', 'Configuration information does not exist')
        }
        return this.get(name)
    }


    /**
     * bindAdapter 绑定
     * @param adapter
     * @param payload
     */
    public static bindAdapter(adapter: any, payload?: {}) {
        // Application.getInstance().providers
        if (!Lib.isClass(adapter)) {
            throw new Exception('Adapter Error', 'The first argument must be a class')
        }
        const instance = payload ? new adapter(payload) : new adapter()
        // Insert
        Application.setAdapter(adapter, instance)
    }

    /**
     * setAdapter 新增
     * @param adapter
     * @param instance
     * @protected
     */
    protected static setAdapter(adapter, instance: object) {
        if (!Lib.isClass(adapter)) {
            throw new Exception('Adapter Error', 'The first argument must be a class')
        }
        if (Application.getAdapter(adapter)) {
            throw new Exception('Adapter Error', 'The adapter is already bound')
        }
        Application.getInstance().adapters.set(adapter, instance)
    }

    /**
     * static getAdapter 获取适配器
     * @param adapter
     * @return instance
     */
    public static getAdapter(adapter) {
        if (!Lib.isClass(adapter)) {
            throw new Exception('Adapter Error', 'The argument must be a class')
        }
        return Application.getInstance().adapters.get(adapter)
    }

    /**
     * getInstance 获取实例
     */
    public static getInstance() {
        let instance: Record<string, any> = Application.instance
        if (!instance) {
            instance = Application.instance = new Application()
        }
        return instance.proxyInstance()
    }

    public static getService(serviceName: string) {
        return Application.getInstance().get(serviceName)
    }

    /**
     * App run
     * @param callback
     */
    public run(callback) {
        const boot = this.lifecycle()

    }
}
