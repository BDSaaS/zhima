export default class Timer {
    protected static instance: object = null
    private queue: any[] = []
    mode: string = ''

    open(name, time, callback) {

    }

    close(name: string | string[]) {

    }

    pause(name: string | string[]) {

    }

    clear() {

    }

    setTimer(name: string, callback) {

    }

    run(name: string) {

    }

    /**
     * has timer
     * @param name
     */
    public has(name: string) {
        const result = this.queue.find((timer) => {
            return timer.name === name
        })
        return !!result
    }

    public static get timer() {
        let instance: Record<string, any> = Timer.instance
        if (!instance) {
            instance = Timer.instance = new Timer()
        }
        return instance
    }
}
