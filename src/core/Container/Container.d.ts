/**
 * Class Container
 * 容器类
 * @author SunnyXu <xy@ztes.com>
 */
export default class Container {
    protected static instance: any;
    protected instances: {};
    protected bindings: Record<string, any>;
    protected aliases: Record<string, string>;
    /**
     * bind
     * @param {String|Array} abstract
     * @param {*} concrete
     */
    bind(abstract: string | string[], concrete: any): void;
    hasInstance(): void;
    /**
     * make 创建类的实例/获取对象 create instance/object
     * @param abstract
     * @param params
     * @param shared
     */
    make(abstract: string, params?: object | [], shared?: boolean): any;
    /**
     * makeClass 创建类
     * @param name
     * @param executor
     * @param params
     * @param shared
     */
    protected makeClass(name: any, executor: any, params: object | any[], shared?: boolean): any;
    /**
     * makeFunc 创建函数
     * @param name
     * @param executor
     * @param params
     * @param shared
     * @protected
     */
    protected makeFunc(name: string, executor: any, params: any, shared?: boolean): any;
    /**
     * has as existence
     * @param {String} name
     */
    has(name: string): boolean;
    /**
     * existence 存在标识
     * @param {String} name
     */
    existence(name: string): boolean;
    /**
     * getAlias 获取别名
     * @param abstract
     */
    getAlias(abstract: string): string;
    /**
     * get 获取实例
     * @param abstract
     */
    get(abstract: string): any;
    /**
     * singleton 单例
     * @param abstract
     * @param concrete
     */
    singleton(abstract: string, concrete: any): void;
    /**
     * setInstance 设置实例
     * @param {Record<string, any>} instance
     */
    setInstance<T>(instance: T): void;
    /**
     * getInstance 获取实例
     *
     */
    getInstance(): object;
    /**
     * proxyInstance 代理实例
     *
     */
    protected proxyInstance(): object;
}
