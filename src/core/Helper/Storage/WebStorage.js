var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import Lib from "../../Libs/Lib";
import Exception from "../../Libs/Exception";
/**
 * Class WebStorage
 * 浏览器存储
 */
export default class WebStorage {
    /**
     * constructor
     * @param {String} type 存储类型
     */
    constructor({ type }) {
        // type 存储类型
        this.type = 'localStorage';
        // storage 存储接口
        this.storage = this.type === 'localStorage' ? localStorage : sessionStorage;
        this.setConfig({ type });
    }
    /**
     * get get|getAll storage
     * @param key
     */
    get(key) {
        if (!key) {
            return this.getAll();
        }
        if (!Lib.isString(key)) {
            throw new Exception('', 'The first parameter is a string');
        }
        return this.storage.getItem(key);
    }
    /**
     * set
     * Set storage 保持/设置数据
     * @param key
     * @param value
     */
    set(key, value) {
        if (key === 'length') {
            throw new Exception('WebStorage Error', 'The key of data must not be length');
        }
        this.storage.setItem(key, JSON.stringify(value));
    }
    /**
     * save
     * Save storage as set set的别名
     * @param key
     * @param value
     */
    save(key, value) {
        this.set(key, value);
    }
    /**
     * delete
     * Delete storage 删除一个或数组内多个
     * @param {String|Array<string>} key
     */
    delete(key) {
        if (!key) {
            this.clear();
        }
        else if (Array.isArray(key)) {
            key.map((k) => {
                this.delete(k);
            });
        }
        else {
            this.storage.removeItem(key);
        }
    }
    /**
     * remove
     * Remove storage as delete delete的别名
     * @param key
     */
    remove(key) {
        this.delete(key);
    }
    /**
     * clear
     * Clear storage 清空
     */
    clear() {
        this.storage.clear();
    }
    /**
     * keys
     * Get storage keys 获取全部键
     * @return keys
     */
    keys() {
        const object = this.getAll();
        return Object.keys(object);
    }
    /**
     * getAll
     * Get storage key & val 获取全部键值对
     */
    getAll() {
        const _a = this.storage, { length } = _a, object = __rest(_a, ["length"]);
        return object;
    }
    /**
     * setConfig
     * @param type
     */
    setConfig({ type }) {
        this.type = type;
    }
}
//# sourceMappingURL=WebStorage.js.map