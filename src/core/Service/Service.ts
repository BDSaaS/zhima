import {IObject} from "../Type/Interface";

export default class Service {
    protected instance: IObject = {}

    constructor(app) {
        this.setInstance(app)
    }

    setInstance(instance) {
        this.instance = instance
    }

    get app() {
        return this.instance
    }
}
