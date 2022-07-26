export default class Service {
    constructor(instance, payload) {
        // instance
        this.instance = {};
        // payload
        this.payload = null;
        this.setInstance(instance);
        this.setPayload(payload);
    }
    /**
     * setInstance
     * @param instance
     */
    setInstance(instance) {
        this.instance = instance;
    }
    /**
     * setPayload
     * @param payload
     */
    setPayload(payload) {
        this.payload = payload;
    }
    /**
     * Get app instance
     * this.app
     */
    get app() {
        return this.instance;
    }
    /**
     * Get args payload
     */
    get args() {
        return this.payload;
    }
}
//# sourceMappingURL=Service.js.map