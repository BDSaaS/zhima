import Lib from "../../Libs/Lib";
import Exception from "../../Libs/Exception";
import {IObject} from "../../Type/Interface";

type StorageValue = string | number | Record<string, any> | Array<any>
type GetStorageValue = string | Record<string, string>

interface IFunction {
    (event:IObject,callback): void
}

// Event function for storage
// let storageEventListener: IFunction
// storageEventListener = function (event, callback): void {
//     callback(event)
// }

// Add event listener
// window.addEventListener('storage', storageEventListener)

class SessionStorage {

    public static storage = localStorage

    // public static event = storageEventListener

    /**
     * get get|getAll storage
     * @param key
     */
    public static get(key?: string) {
        if (!key) {
            return SessionStorage.getAll()
        }
        if (!Lib.isString(key)) {
            throw new Exception('', 'The first parameter is a string')
        }
        return SessionStorage.storage.getItem(key)
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

