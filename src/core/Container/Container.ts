interface IObject {
    [propName: string]: any
}

import Exception from "../Libs/Exception"
import Lib from "../Libs/Lib"

/**
 * Container 容器
 * @author SunnyXu <xy@ztes.com>
 */

export default class Container {

    static instance: object = null
    //
    protected instances: Record<string, any> = {}

    protected binds: Record<string, any> = {}
    // alias 别名集
    protected aliases: Record<string, string> = {}

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
            return;
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
     * make 生成 Instance
     * @param abstract
     * @param params
     */
    make(abstract: string, ...params: any) {
        // abstract不存在
        if (!this.instances.hasOwnProperty(abstract)) {
            throw new Exception('Container Error', 'The abstract does not exist')
        }
        const instance = this.instances[abstract]
        if (Lib.isClass(instance)) {
            this.bind(abstract, new instance(...params))
        } else {
            throw new Exception('Container Error', 'The abstract is not class')
        }
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
    singleton(abstract, concrete) {
        this.bind(abstract, concrete)
    }

    /**
     * 设置实例
     * @param {Record<string, any>} instance
     */
    public setInstance(instance: object) {
        Container.instance = instance;
    }

    /**
     * 获取实例
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
     * 获取代理实例
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
