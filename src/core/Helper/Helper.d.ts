/**
 * Class Helper
 * 助手函数
 */
import { IObject } from "../Type/Interface";
import Service from "../Service/Service";
/**
 * Class Helper
 * @extends Service
 */
export default class Helper extends Service {
    env(): void;
    storage(name: string, payload?: IObject): void;
    cookie(): void;
    session(): void;
    http(api: any, data: any, handle: any): Promise<void>;
    send(api: string, data: IObject, handle?: Function, config?: IObject): Promise<any>;
    checkAuth(): void;
}
