import {IObject} from "../Type/Interface";

export default class Service {
    // instance
    private instance: IObject = {}
    // payload
    private payload: any = null

    constructor(instance, payload) {
        this.setInstance(instance)
        this.setPayload(payload)
    }

    /**
     * setInstance
     * @param instance
     */
    setInstance(instance) {
        this.instance = instance
    }

    /**
     * setPayload
     * @param payload
     */
    setPayload(payload) {
        this.payload = payload
    }

    /**
     * Get app instance
     * this.app
     */
    get app() {
        return this.instance
    }

    /**
     * Get args payload
     */
    get args() {
        return this.payload
    }
}
