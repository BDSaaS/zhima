export default class ServiceProvider {
    protected app: Record<any, any>

    constructor(app) {
        this.app = app
        this.register()
    }

    protected register() {
        this.app.singleton()
    }

    public boot() {

    }
}