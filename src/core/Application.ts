import Container from "./Container/Container";
import Exception from "./Libs/Exception";
import Lib from "./Libs/Lib";

/**
 * Application 核心入口
 * @author SunnyXu <xy@ztes.com>
 */
export default class Application extends Container {
    // VERSION
    private static VERSION = '0.0.1'
    // Adapters
    protected adapters = new WeakMap()
    // Providers
    protected providers: [] = []
    // Services
    protected services: [] = []
    // Lifecycle
    protected steps = null

    /**
     * Get version
     * @return {String} version
     */
    public get version(): string {
        return Application.VERSION
    }

    /**
     * config 配置项
     * @param {Object} config
     * @param {String} name
     */
    public config(config: {}, name: string = '$config'): void {
        // bind
        this.singleton(name, config)
    }

    /**
     * getConfig 获取配置项
     * @param name
     * @param {Object} def 默认值
     */
    public getConfig(name, def?: object) {
        if (!this.has(name)) {
            if (def) {
                return def
            }
            throw new Exception('Config Error', 'Configuration information does not exist')
        }
        return this.get(name)
    }

    public setAdapter() {

    }




    public run() {

    }
}
