/**
 * Class Helper
 * 助手函数
 */
import {IObject} from "../Type/Interface";
import Exception from "../Libs/Exception";
import Storage from "./Storage";
import Service from "../Service/Service";
import Lib from "../Libs/Lib";

/**
 * Class Helper
 * @extends Service
 */
export default class Helper extends Service {
    public env() {

    }

    public storage(name: string, payload?: IObject) {

    }

    public cookie() {

    }

    public session() {

    }

    

    public async http(api, data, handle) {
        try {
            const response = await this.send(api, data, handle)
        } catch (e) {

        }
    }

    public async send(api: string, data: IObject, handle?: Function, config?: IObject) {
        if (!this.app.has('$request')) {
            throw new Exception('RequestService Error', '')
        }
        const response = await this.app.get('$request').send(api, data)
        if (Lib.isFunction(handle)) {
            handle(response)
        }
        return response
    }

    public checkAuth() {

    }
}
