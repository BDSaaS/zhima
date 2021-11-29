// Lib
import Lib from "../Libs/Lib";
import Exception from "../Libs/Exception";
// Type
import {IObject} from "../Type/Interface";
// Event function for storage
function storageEventListener(event) {
    return event
}

/**
 * Class Storage
 * localStorage 存储
 */
export default class Storage {
    public static storage = localStorage

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

    public static clear(name?: string) {

    }

    public static keys() {

    }

    public static getAll() {

    }
}
