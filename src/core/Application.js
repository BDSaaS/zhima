import Container from "./Container/Container";
import Exception from "./Libs/Exception";
import Lib from "./Libs/Lib";
/**
 * Application 核心应用
 * @extends Container
 * @author SunnyXu <xy@ztes.com>
 */
export default class Application extends Container {
    constructor() {
        super(...arguments);
        // Adapters
        this.adapters = new WeakMap();
        // Providers
        this.providers = [];
        // Services
        this.services = [];
        // Lifecycle step
        this.step = 'init';
    }
    /**
     * Get version 版本
     * @return {String} version
     */
    get version() {
        return Application.VERSION;
    }
    lifecycle() {
        return {
            // create
            create: () => {
                if (this.step === 'init') {
                    this.step = 'beforeCreate';
                }
            },
            // created
            created: () => {
                this.step = 'created';
            },
            // mounted
            mounted: () => {
                this.step = 'mounted';
            },
            // unmounted
            unmounted: () => {
                this.step = 'unmounted';
            }
        };
    }
    /**
     * getProviders 获取
     * @protected
     */
    static getProviders() {
        const providers = Application.getInstance().providers;
        return Array.isArray(providers) && providers.length > 0 ? providers : [];
    }
    /**
     * setProviders 设置
     * @param providers
     */
    setProviders(providers) {
        const instanceProviders = Application.getInstance().providers;
        if (Array.isArray(instanceProviders)) {
            Application.getInstance().providers = instanceProviders.filter((instanceProvider) => {
                const hasProvider = providers.find((provider) => {
                    return instanceProvider === provider;
                });
                return !hasProvider;
            });
            Application.getInstance().providers = Application.getInstance().getProviders().concat(providers);
        }
    }
    /**
     * registerProvider 注册
     * @param provider
     * @param payload
     */
    registerProvider(provider, payload) {
        if (!Lib.isClass(provider)) {
            throw new Exception('Provider Error', 'The first argument must be a class');
        }
        new provider(Application.getInstance()).register(payload);
    }
    /**
     * registerProviders 批量注册
     * @param providers
     */
    registerProviders(providers) {
        if (Array.isArray(providers)) {
            providers.map((provider) => {
                this.registerProvider(provider);
            });
        }
    }
    /**
     * config 配置
     * @param {Object} config
     * @param {String} name
     */
    static setConfig(config, name = '$config') {
        // singleton
        this.prototype.singleton(name, config);
    }
    /**
     * getConfig 获取
     * @param name
     * @param {Object} def 默认值
     */
    getConfig(name, def) {
        if (!this.has(name)) {
            if (def) {
                return def;
            }
            throw new Exception('Config Error', 'Configuration information does not exist');
        }
        return this.get(name);
    }
    /**
     * bindAdapter 绑定
     * @param adapter
     * @param payload
     */
    static bindAdapter(adapter, payload) {
        // Application.getInstance().providers
        if (!Lib.isClass(adapter)) {
            throw new Exception('Adapter Error', 'The first argument must be a class');
        }
        const instance = payload ? new adapter(payload) : new adapter();
        // Insert
        Application.setAdapter(adapter, instance);
    }
    /**
     * setAdapter 新增
     * @param adapter
     * @param instance
     * @protected
     */
    static setAdapter(adapter, instance) {
        if (!Lib.isClass(adapter)) {
            throw new Exception('Adapter Error', 'The first argument must be a class');
        }
        if (Application.getAdapter(adapter)) {
            throw new Exception('Adapter Error', 'The adapter is already bound');
        }
        Application.getInstance().adapters.set(adapter, instance);
    }
    /**
     * static getAdapter 获取适配器
     * @param adapter
     * @return instance
     */
    static getAdapter(adapter) {
        if (!Lib.isClass(adapter)) {
            throw new Exception('Adapter Error', 'The argument must be a class');
        }
        return Application.getInstance().adapters.get(adapter);
    }
    /**
     * getInstance 获取实例
     */
    static getInstance() {
        let instance = Application.instance;
        if (!instance) {
            instance = Application.instance = new Application();
        }
        return instance.proxyInstance();
    }
    /**
     * App run
     * @param callback
     */
    run(callback) {
        const boot = this.lifecycle();
    }
}
// VERSION
Application.VERSION = '0.0.1';
//# sourceMappingURL=Application.js.map