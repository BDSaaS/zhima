import Exception from "../Libs/Exception";
import Service from "../Service/Service";
import Lib from "../Libs/Lib";
/**
 * Class Helper
 * @extends Service
 */
export default class Helper extends Service {
    env() {
    }
    storage(name, payload) {
    }
    cookie() {
    }
    session() {
    }
    async http(api, data, handle) {
        try {
            const response = await this.send(api, data, handle);
        }
        catch (e) {
        }
    }
    async send(api, data, handle, config) {
        if (!this.app.has('$request')) {
            throw new Exception('RequestService Error', '');
        }
        const response = await this.app.get('$request').send(api, data);
        if (Lib.isFunction(handle)) {
            handle(response);
        }
        return response;
    }
    checkAuth() {
    }
}
//# sourceMappingURL=Helper.js.map