type StorageValue = string | number | Record<string, any> | Array<any>
type GetStorageValue = string | Record<string, string>

class BDStorage {
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

const storage = new BDStorage(localStorage)

storage.set('info', {name: 'bob', age: 18})
storage.set('age', 18)
storage.set('name', 'bob')

console.log(storage);
console.log(storage.get('name'));
console.log(storage.instance)
console.log(storage.keys)
console.log(storage.getAll)
storage.delete('info')
storage.delete(['age'])
console.log(storage.get());
storage.clear()
