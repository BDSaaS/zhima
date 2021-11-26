interface IObject {
    [propName: string]: any
}

import Exception from "../Libs/Exception";
import Lib from "../Libs/Lib";

/**
 * Container 容器
 * @author SunnyXu <xy@ztes.com>
 */
export default class Container {
    // instance 实例
    protected static instance: object = null
    // instance 实例集
    protected instances: Record<string, any> = {}
    // bind 绑定集
    protected binds: Record<string, any> = {}
    // alias 别名集
    protected aliases: Record<string, string> = {}

    /**
     * bind
     * @param {String|Array} abstract
     * @param {*} concrete
     */
    public bind(abstract: string | string[], concrete) {
        // null
        if (!abstract) {
            throw new Exception('Abstract Error', 'Abstract not null')
        }
        // abstract为数组
        if (Array.isArray(abstract)) {
            abstract.map((abs) => {
                this.bind(abs, concrete);
            })
            return
        }
        // abstract不为字符串
        if (!Lib.isString(abstract)) {
            throw new Exception('Abstract Error', 'The abstract name is a string');
        }
        // concrete类型
        if (Lib.isObject(concrete) || Lib.isClass(concrete)) {
            this.instances[abstract] = concrete
        } else if (Lib.isFunction(concrete) && !Lib.isClass(concrete)) {
            this.binds[abstract] = concrete
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
    public make(abstract: string, params: object | [], shared: boolean = false) {
        // 获取 abstract别名
        abstract = this.getAlias(abstract)
        // abstract 不存在
        if (!this.binds.hasOwnProperty(abstract)) {
            throw new Exception('Container Error', 'The abstract does not exist')
        }
        // executor 待执行
        let executor = this.binds[abstract]
        // executor 处理
        if (Lib.isClass(executor)) {
            return this.makeClass(abstract, executor, params, shared)
        } else if (Lib.isFunction(executor)) {
            return this.makeFunc(abstract, executor, params, shared)
        }
        return executor
    }

    /**
     * makeClass 创建类
     * @param name
     * @param executor
     * @param params
     * @param shared
     */
    protected makeClass(name, executor, params: object | [], shared: boolean = false) {
        const func = () => {
            return new executor(params)
        }
        if (shared) {
            this.bind(name, func)
            return this.instances[name]
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
    protected makeFunc(name, executor, params, shared: boolean = false) {
        const func = executor(params)
        if (shared) {
            this.bind(name, func)
            return this.instances[name]
        }
        return func
    }

    /**
     * has 存在标识
     * @param {String} name
     */
    public has(name: string) {
        return this.binds[name] || this.instances[name] || this.getAlias(name)
    }

    /**
     * getAlias 获取别名
     * @param abstract
     */
    getAlias(abstract) {
        const alias = this.aliases[abstract]
        return alias ? alias : abstract
    }

    /**
     * singleton 单例
     * @param abstract
     * @param concrete
     */
    singleton(abstract, concrete): void {
        this.bind(abstract, concrete)
    }

    /**
     * setInstance 设置实例
     * @param {Record<string, any>} instance
     */
    public setInstance(instance: object): void {
        Container.instance = instance;
    }

    /**
     * getInstance 获取实例
     *
     */
    public getInstance(): object {
        let instance: Record<string, any> = Container.instance;
        if (!instance) {
            instance = Container.instance = new Container();
        }
        return instance.proxyInstance();
    }

    /**
     * proxyInstance 代理实例
     * @protected
     */
    protected proxyInstance() {
        return new Proxy(this, {
            get: (target, propKey) => {
                return target[propKey];
            }
        })
    }

}
