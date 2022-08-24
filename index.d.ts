declare type UtilityFunction = typeof Function;
declare type UtilityObject = Record<any, any>;
interface UtilityClass {
    new (...payload: any[]): any;
}

interface IContainer {
    bind(abstract: string | string[], concrete: any): void;
    has(name: string): boolean;
    existence(name: string): boolean;
    singleton(abstract: string, concrete: any): void;
    setInstance<T>(instance: T): void;
    getInstance(): this;
}
declare type TResponseDataReturn = {
    statusCode: number;
    msg: string;
    data: any;
    timestamp: number;
};
interface IResponseReturn extends Response {
    data: TResponseDataReturn;
}
interface IHelper {
    env(): Record<any, any>;
    storage(name: string): Record<any, any>;
    storage(name: string, payload?: any): void;
    cookies(name: string): Record<any, any>;
    cookies(name: string, payload?: any): void;
    session(name: string): Record<any, any>;
    session(name: string, payload?: any): void;
    /**
     * 发送一个http请求
     * @param api 接口key
     * @param data  请求数据
     * @param handle 处理Response的函数
     */
    http(api: string, data?: UtilityObject, handle?: (response: IResponseReturn) => void): Promise<TResponseDataReturn>;
    send(api: string, data?: UtilityObject, handle?: UtilityFunction, config?: IHelper): Promise<IResponseReturn>;
}
declare type TRequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';
/**
 * Adapter Interface
 */
declare type IHttpConfig = {
    method: TRequestMethod;
    url: string;
    data: Record<string, any>;
    headers: Record<string, any>;
};
declare type IHttpAdapter = <T>(config: IHttpConfig) => Promise<T>;

/**
 * Class Container
 * 容器类
 * @author SunnyXu <xy@ztes.com>
 */
declare class Container implements IContainer {
    protected static instance: any;
    protected instances: Map<any, any>;
    protected bindings: Record<string, any>;
    protected aliases: Record<string, any>;
    /**
     * bind 绑定实体
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
    protected makeClass(name: string, executor: UtilityClass, params: any, shared?: boolean): any;
    /**
     * makeFunc 创建函数
     * @param name
     * @param executor
     * @param params
     * @param shared
     * @protected
     */
    protected makeFunc(name: string, executor: UtilityFunction, params: any, shared?: boolean): any;
    /**
     * has as existence
     * 是否存在标识 existence 的别名
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
    getAlias(abstract: string): any;
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
    getInstance(): any;
    /**
     * proxyInstance 代理实例
     *
     */
    protected proxyInstance(): this;
}

/**
 * Application 核心应用
 * @extends Container
 * @author SunnyXu <xy@ztes.com>
 */
declare class Application extends Container {
    private static VERSION;
    private adapters;
    private providers;
    /**
     * lifecycle
     * 生命周期
     * @private
     */
    private static lifecycle;
    /**
     * getterProviders Providers 获取器
     */
    getterProviders(): any[];
    /**
     * getProviders
     * 获取
     * @protected
     */
    private static getProviders;
    /**
     * setterProviders Providers
     * 设置器
     * @param providers
     */
    setterProviders<T>(providers: T[]): void;
    /**
     * setProviders
     * 设置
     * @param providers
     */
    static setProviders<T>(providers: T[]): void;
    /**
     * registerProvider
     * 注册
     * @param provider
     * @param payload
     */
    static registerProvider(provider: UtilityClass, payload?: Record<any, any>): void;
    /**
     * registerProviders
     * 批量注册
     * @param providers
     */
    static registerProviders(providers: any[]): void;
    /**
     * config
     * 配置
     * @param {Object} config
     * @param {String} name
     */
    static setConfig(name: string, config: UtilityObject): void;
    /**
     * getConfig
     * 获取
     * @param name
     * @param {Object} def 默认值
     */
    static getConfig(name: string, def?: any): UtilityObject;
    /**
     * setAppConfig
     * 设置App配置
     * @param config
     */
    static setAppConfig(config: UtilityObject): void;
    /**
     * getAppConfig
     * 获取App配置
     * @param name
     */
    static getAppConfig(name: string): any;
    /**
     * bindAdapter
     * 绑定
     * @param adapter
     * @param payload
     */
    static bindAdapter(adapter: UtilityClass, payload?: UtilityObject): void;
    /**
     * setAdapter
     * 新增
     * @param adapter
     * @param instance
     * @protected
     */
    setterAdapter(adapter: UtilityClass, instance: UtilityObject): void;
    /**
     * static getAdapter
     * 获取适配器
     * @param adapter 必须是个类
     * @return instance
     */
    static getAdapter(adapter: UtilityClass): UtilityClass;
    /**
     * static getAdapter
     * 适配器 获取器
     * @param adapter
     */
    getterAdapter(adapter: UtilityFunction): any;
    /**
     * getInstance
     * 获取实例
     */
    private static getInstance;
    /**
     * getService
     * 获取服务实例
     * @param serviceName
     */
    static getService<T>(serviceName: string): T;
    /**
     * App run
     * 框架应用运行
     * @param callback
     */
    static run(callback?: UtilityFunction): void;
}

/**
 * Exception Class
 * 目前原生的错误类型
 * Error [一般错误类型]
 * SyntaxError [语法错误]
 * ReferenceError [不存在的变量]
 * RangeError [超出有效范围]
 * TypeError [非预期类型]
 * URIError [URI参数错误]
 * EvalError [eval函数没有正确执行]
 * Example: throw new Exception() catch(error) error.name,error.message,error.code,error.stack
 */
declare class Exception extends Error {
    name: string;
    message: string;
    code: number;
    /**
     *
     * @param {String} name 错误名称
     * @param {String} message 错误提示
     * @param {Number} code 错误码
     */
    constructor(name: string, message: string, code?: number);
}

declare abstract class Command {
    protected payload: any;
    protected $helper: IHelper;
    constructor(...payload: any[]);
    abstract handle(...args: any[]): any | Promise<any> | void;
}

/**
 * Class Transformer 转换器
 * NewTransformer extends Transformer -> constructor(){super(data,payload)}
 */
declare abstract class Transformer {
    private readonly data;
    private payload;
    /**
     * Method constructor
     * @param {*} data 需处理的数据
     * @param {*} payload 携带的载荷
     * @returns
     */
    constructor(data: any, payload?: unknown);
    /**
     * Method transform
     * 转换方法
     * @param {Object|String|Number} data
     * @param tData
     * @returns
     */
    transform(data: any, tData?: any): any;
    /**
     * Method create
     * 创建新数据
     * @return {Array/Object|String|Number|*}
     */
    create(): any;
    /**
     * 格式化数字
     * @param {String|Number} number 待处理数字
     * @param {Number} places 小数点位数 -1为原样保留
     * @param {String} thousand 千位字符串 默认为空
     * @param {String} decimal 小数点替换字符 默认为.
     * @return {String|Number}
     */
    formatNumber(number: string | number, places?: number | string, thousand?: string, decimal?: string): string;
    /**
     * formatDate 日期格式化
     * @param {string|number} timestamp
     * @returns
     */
    formatDate(timestamp?: number | string | unknown): Record<string, number | string>;
}

declare type variableType = 'string' | 'number' | 'object' | 'undefined' | 'function' | 'boolean' | 'bigInt' | 'symbol';
/**
 * Class Lib
 * 基础函数库，Lodash、Underscore... So big
 */
declare class Lib {
    /**
     * typeOf 判断变量类型
     * @param value
     * @param type
     */
    static typeOf<T>(value: unknown, type: variableType): value is T;
    /**
     * getTag 判断变量类型
     * @param value
     */
    static getTag(value: unknown): string;
    /**
     * isFunction 是否函数
     * @param {Function} value
     * @return {Boolean}
     */
    static isFunction(value: unknown): value is typeof Function;
    /**
     * isString 是否字符串
     * @param {String} value
     * @return {Boolean}
     */
    static isString(value: unknown): value is string;
    /**
     * isNumber 是否数字
     * @param value
     * @return {Boolean}
     */
    static isNumber(value: unknown): value is number;
    /**
     * isObject 是否对象
     * @param {Object} value
     */
    static isObject(value: unknown): value is Record<any, any>;
    /**
     * isObject 是否Undefined
     * @param {*} value
     * @return boolean
     */
    static isUndefined(value: unknown): boolean;
    /**
     * isNull 是否Null
     * @param value
     */
    static isNull(value: unknown): boolean;
    /**
     * isEmpty 是否空
     * 目前只对 null undefined '' {} [] 做处理
     * @param value
     */
    static isEmpty(value: unknown): boolean;
    /**
     * isClass 是否类
     * @param value
     */
    static isClass(value: unknown): boolean;
}

/**
 * Class AxiosAdapter
 */
declare class AxiosAdapter {
    private http;
    private method;
    private url;
    private data;
    private headers;
    /**
     * Method constructor 注入Axios
     * @param {*} $function
     * @returns
     */
    constructor($function: IHttpAdapter);
    /**
     * Method setConfig
     * 设置配置信息
     * @param {method,url,data,headers} param
     */
    setConfig({ method, url, data, headers }: IHttpConfig): void;
    /**
     * Method request
     * @returns Promise
     */
    request(): Promise<unknown>;
}

interface CreateApp {
    template: string;
}
interface InjectionKey<T> extends Symbol {
}
declare type PluginInstallFunction = (app: AppInterface, ...options: any[]) => any;
interface AppInterface {
    version: string;
    config: Record<any, any>;
    /**
     * use
     * @param plugin
     * @param options
     */
    use(plugin: PluginInstallFunction, ...options: any[]): this;
    /**
     * mixin
     * @param config
     */
    mixin(config: Record<any, any>): void;
    /**
     * component 组件注册
     * @param name 组件名称
     * @param config 组件配置
     */
    component(name: string, config: any | Record<any, any>): any;
    /**
     * directive 指令注册
     * @param name
     * @param config
     */
    directive(name: string, config: any | Record<any, any>): any;
    /**
     * mount 挂载
     * @param rootContainer
     */
    mount<T>(rootContainer: Element | string): T;
    /**
     * unmount 卸载
     */
    unmount(): void;
    /**
     * provide 提供(者)
     * @param key
     * @param value
     */
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this;
}
declare class Vue3Adapter {
    private Vue;
    private static app;
    directive(name: string, config: any): any;
    mixin(config: Record<any, any>): void;
    mount(root: string): any;
    provide<T>(key: InjectionKey<T> | string, value: T): AppInterface;
    unmount(): void;
    use(plugin: any, ...options: any[]): ReturnType<AppInterface['use']>;
    constructor($class: any);
    createApp(config: CreateApp): AppInterface;
    component(name: string, config: any | Record<any, any>): void;
    run(root: string): void;
}

export { AxiosAdapter, Command, Container, Exception, Lib, Transformer, Vue3Adapter, Application as default };
