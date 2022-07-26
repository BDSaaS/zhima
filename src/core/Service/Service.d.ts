import { IObject } from "../Type/Interface";
export default class Service {
    private instance;
    private payload;
    constructor(instance: any, payload: any);
    /**
     * setInstance
     * @param instance
     */
    setInstance(instance: any): void;
    /**
     * setPayload
     * @param payload
     */
    setPayload(payload: any): void;
    /**
     * Get app instance
     * this.app
     */
    get app(): IObject;
    /**
     * Get args payload
     */
    get args(): any;
}
