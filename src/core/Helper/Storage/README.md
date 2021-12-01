- [x] set：可传入普通值，对象及数组 <br>
- [x] get：不传参，获取所有 key 对应的值，包装成对象 <br>
- [x] delete：可传数组，删一串 <br>
- [x] clear：删除所有 <br>
- [x] keys：返回所有 key，返回 array <br>
- [x] getAll：获取所有 key 对应的值，包装成对象


type StorageValue = string | number | Record<string, any> | Array<any>
type GetStorageValue = string | Record<string, string>

class LocalStorage {
private readonly _storage: Storage

    constructor(storage: Storage) {
        this._storage = storage
    }

    get instance(): Storage {
        return this._storage
    }

    set(key: string, value: StorageValue): void {
        this._storage.setItem(key, JSON.stringify(value))
    }

    get(key?: string): GetStorageValue {
        return key ? this._storage.getItem(key) : this.getAll
    }

    delete(keys: string | Array<string>): void {
        Array.isArray(keys) ? keys.forEach(key => this.remove(key)) : this.remove(keys)
    }

    private remove(key: string): void {
        this._storage.removeItem(key)
    }

    clear(): void {
        this._storage.clear()
    }

    get keys(): Array<string> {
        const {length, ...other} = this._storage
        return Object.keys(other)
    }

    get getAll(): Record<string, string> {
        const {length, ...other} = this._storage
        return other
    }
}
