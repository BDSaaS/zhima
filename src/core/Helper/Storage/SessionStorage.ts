import Lib from "../../Libs/Lib";
import Exception from "../../Libs/Exception";
import {IObject} from "../../Type/Interface";

type StorageValue = string | number | Record<string, any> | Array<any>
type GetStorageValue = string | Record<string, string>

interface IFunction {
    (event: IObject, callback): void
}

type Type = 'localStorage' | 'sessionStorage'

class Storage {
    // type 存储类型
    public static type: Type = 'localStorage'
    // storage 存储接口
    public static storage = Storage.type === 'localStorage' ? localStorage : sessionStorage

    /**
     * get get|getAll storage
     * @param key
     */
    public static get(key?: string) {
        if (!key) {
            return Storage.getAll()
        }
        if (!Lib.isString(key)) {
            throw new Exception('', 'The first parameter is a string')
        }
        return Storage.storage.getItem(key)
    }

    public static set(key: string, value: string | any[] | IObject) {

    }

    public static delete(key: string | string[]) {

    }

    public static clear() {

    }

    public static keys() {

    }

    public static getAll() {

    }
}

