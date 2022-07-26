import Container from "./Container/Container";
/**
 * Application 核心应用
 * @extends Container
 * @author SunnyXu <xy@ztes.com>
 */
export default class Application extends Container {
    private static VERSION;
    private adapters;
    private providers;
    private services;
    private step;
    /**
     * Get version 版本
     * @return {String} version
     */
    get version(): string;
    private lifecycle;
    /**
     * getProviders 获取
     * @protected
     */
    private static getProviders;
    /**
     * setProviders 设置
     * @param providers
     */
    private setProviders;
    /**
     * registerProvider 注册
     * @param provider
     * @param payload
     */
    registerProvider(provider: any, payload?: Record<any, any>): void;
    /**
     * registerProviders 批量注册
     * @param providers
     */
    registerProviders(providers: []): void;
    /**
     * config 配置
     * @param {Object} config
     * @param {String} name
     */
    static setConfig(config: {}, name?: string): void;
    /**
     * getConfig 获取
     * @param name
     * @param {Object} def 默认值
     */
    getConfig(name: any, def?: object): any;
    /**
     * bindAdapter 绑定
     * @param adapter
     * @param payload
     */
    static bindAdapter(adapter: any, payload?: {}): void;
    /**
     * setAdapter 新增
     * @param adapter
     * @param instance
     * @protected
     */
    protected static setAdapter(adapter: any, instance: object): void;
    /**
     * static getAdapter 获取适配器
     * @param adapter
     * @return instance
     */
    static getAdapter(adapter: any): any;
    /**
     * getInstance 获取实例
     */
    static getInstance(): any;
    /**
     * App run
     * @param callback
     */
    run(callback: any): void;
}
