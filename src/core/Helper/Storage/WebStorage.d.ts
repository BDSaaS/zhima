import { IObject } from "../../Type/Interface";
declare type Type = 'localStorage' | 'sessionStorage';
/**
 * Class WebStorage
 * 浏览器存储
 */
export default class WebStorage {
    type: Type;
    storage: Storage;
    /**
     * constructor
     * @param {String} type 存储类型
     */
    constructor({ type }: {
        type: any;
    });
    /**
     * get get|getAll storage
     * @param key
     */
    get(key?: string): string | IObject;
    /**
     * set
     * Set storage 保持/设置数据
     * @param key
     * @param value
     */
    set(key: string, value: string | any[] | IObject): void;
    /**
     * save
     * Save storage as set set的别名
     * @param key
     * @param value
     */
    save(key: string, value: string | any[] | IObject): void;
    /**
     * delete
     * Delete storage 删除一个或数组内多个
     * @param {String|Array<string>} key
     */
    delete(key: string | string[]): void;
    /**
     * remove
     * Remove storage as delete delete的别名
     * @param key
     */
    remove(key: string | string[]): void;
    /**
     * clear
     * Clear storage 清空
     */
    clear(): void;
    /**
     * keys
     * Get storage keys 获取全部键
     * @return keys
     */
    keys(): IObject;
    /**
     * getAll
     * Get storage key & val 获取全部键值对
     */
    getAll(): {
        [name: string]: any;
        clear(): void;
        getItem(key: string): string;
        key(index: number): string;
        removeItem(key: string): void;
        setItem(key: string, value: string): void;
    };
    /**
     * setConfig
     * @param type
     */
    setConfig({ type }: {
        type: any;
    }): void;
}
export {};
