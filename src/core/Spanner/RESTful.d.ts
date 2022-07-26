import { IObject } from "../Type/Interface";
/**
 * Class RESTful
 * RESTful处理类
 * @author SunnyXu <xy@ztes.com>
 */
export default class RESTful {
    private type;
    private sendData;
    constructor(uri: string, data: IObject, type: boolean);
    private setData;
    private get data();
    private get checkUri();
    private make;
}
