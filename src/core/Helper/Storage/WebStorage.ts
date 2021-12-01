import Lib from "../../Libs/Lib";
import Exception from "../../Libs/Exception";
import {IObject} from "../../Type/Interface";

type StorageValue = string | number | Record<string, any> | Array<any>
type GetStorageValue = string | Record<string, string>

interface IFunction {
    (event: IObject, callback): void
}

type Type = 'localStorage' | 'sessionStorage'

/**
 * Class WebStorage
 * 浏览器存储
 */
export default class WebStorage {
    // type 存储类型
    public type: Type = 'localStorage'
    // storage 存储接口
    public storage = this.type === 'localStorage' ? localStorage : sessionStorage

    /**
     * constructor
     * @param {String} type 存储类型
     */
    constructor({type}) {
        this.setConfig({type})
    }

    /**
     * get get|getAll storage
     * @param key
     */
    public get(key?: string): string | IObject {
        if (!key) {
            return this.getAll()
        }
        if (!Lib.isString(key)) {
            throw new Exception('', 'The first parameter is a string')
        }
        return this.storage.getItem(key)
    }

    /**
     * set
     * Set storage 保持/设置数据
     * @param key
     * @param value
     */
    public set(key: string, value: string | any[] | IObject): void {
        if (key === 'length') {
            throw new Exception('WebStorage Error', 'The key of data must not be length')
        }
        this.storage.setItem(key, JSON.stringify(value))
    }

    /**
     * save
     * Save storage as set set的别名
     * @param key
     * @param value
     */
    public save(key: string, value: string | any[] | IObject): void {
        this.set(key, value)
    }

    /**
     * delete
     * Delete storage 删除一个或数组内多个
     * @param {String|Array<string>} key
     */
    public delete(key: string | string[]): void {
        if (!key) {
            this.clear()
        } else if (Array.isArray(key)) {
            key.map((k) => {
                this.delete(k)
            })
        } else {
            this.storage.removeItem(key)
        }
    }

    /**
     * remove
     * Remove storage as delete delete的别名
     * @param key
     */
    public remove(key: string | string[]): void {
        this.delete(key)
    }

    /**
     * clear
     * Clear storage 清空
     */
    public clear(): void {
        this.storage.clear()
    }

    /**
     * keys
     * Get storage keys 获取全部键
     * @return keys
     */
    public keys(): IObject {
        const object = this.getAll()
        return Object.keys(object)
    }

    /**
     * getAll
     * Get storage key & val 获取全部键值对
     */
    public getAll() {
        const {length, ...object} = this.storage
        return object
    }

    /**
     * setConfig
     * @param type
     */
    public setConfig({type}) {
        this.type = type
    }
}

