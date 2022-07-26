import Service from "./Service"
import Application from "../Application"

export default class CommandService extends Service {
    protected helper: Record<any, any>

    constructor() {
        super()
        this.helper = Application.getService()
    }

    get $helper(): Record<any, any> {
        return this.helper
    }
}