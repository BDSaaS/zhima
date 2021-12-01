/**
 * Class Agent
 * 代理服务
 */
export default class Agent {
    protected static proxy = null

    set() {

    }

    get instance() {
        if (Agent.proxy) {
            return Agent.proxy
        }
        this.set()
        return Agent.proxy
    }
}
