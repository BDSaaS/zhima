/**
 * Timer status
 * 'Waiting' 等待/尚未执行 | 'Running' 执行中 | 'Paused' 已暂停 | 'Closed' 已关闭 | 'Undefined' 尚未定义
 */
import Exception from "../Libs/Exception";

type Status = 'Waiting' | 'Running' | 'Paused' | 'Closed' | 'Undefined'
// Timer Mode
type Mode = 'setInterval' | 'setTimeout' | 'Interval' | 'Timeout'

interface InterfaceTimer {
    name: string
    id: number | null
    executionTime: number
    status: Status
    callback
}

export default class Timer {
    // instance
    protected static instance: object = null
    // queue 执行队列
    private queue: InterfaceTimer[] = []
    // // waitingQueue
    // private waitingQueue: InterfaceTimer[] = []
    private mode: Mode = 'setInterval'

    /**
     * dispatch
     * Timer dispatch * 核心方法 分发【添加并执行】
     * @param name
     * @param time
     * @param callback
     */
    dispatch(name: string, time: number, callback) {
        this.add(name, time, callback).run(name)
    }

    /**
     * run
     * Run timer
     * @param name Timer name
     */
    run(name: string) {
        const timer = this.has(name)
        // Waiting to run
        if (timer && timer.status === 'Waiting' || 'Paused' || 'Closed') {
            timer.status = 'Running'
            timer.id = this.mode === 'setTimeout' || 'Timeout' ? this.setTimeout(timer.callback, timer.executionTime) : this.setInterval(timer.callback, timer.executionTime)
            this.updateTimer(timer)
            return
        } else if (timer && timer.status === 'Running') {
            // Running
            throw new Exception('TimerError', 'The timer is running. Please do not run it again')
        }
        // Undefined
        throw new Exception('TimerError', 'Please do not run a timer that has not been defined')
    }

    setInterval(callback, time: number): number {
        return setInterval(callback, time)
    }

    setTimeout(callback, time: number): number {
        return setTimeout(callback, time)
    }

    public close(name: string | string[]) {

    }

    public pause(name: string | string[]) {

    }

    public clear() {

    }

    public join() {

    }

    /**
     * add
     * Add timer
     * @param name
     * @param time
     * @param callback
     */
    public add(name: string, time: number, callback) {
        const status = this.status(name)
        if (status === 'Undefined') {
            this.setTimer(name, time, callback)
        }
        return this
    }

    public remove(name: string | string[]) {

    }

    /**
     * setTimer
     * @param name
     * @param time
     * @param callback
     * @private
     */
    private setTimer(name: string, time: number, callback) {
        this.queue.push({
            name,
            id: null,
            executionTime: time,
            status: 'Waiting',
            callback
        })
    }

    /**
     * updateTimer
     * Update queue
     * @param timer
     * @private
     */
    private updateTimer(timer: InterfaceTimer) {
        const queue = this.queue.map((queueTimer) => {
            if (queueTimer.name === timer.name) {
                return timer
            }
            return queueTimer
        })
        this.setQueue(queue)
    }

    /**
     * setQueue
     * @param queue
     * @private
     */
    private setQueue(queue: InterfaceTimer[]) {
        this.queue = queue
    }

    /**
     * status
     * Timer status
     * @param name
     */
    public status(name: string): Status {
        const timer = this.has(name)
        if (timer) {
            return timer.status
        }
        return 'Undefined'
    }

    /**
     * has
     * Has timer
     * @param name
     */
    public has(name: string): InterfaceTimer | undefined {
        return this.queue.find((timer) => {
            return timer.name === name
        })
    }

    /**
     * timer
     * Timer instance
     */
    public static get timer() {
        let instance: Record<string, any> = Timer.instance
        if (!instance) {
            instance = Timer.instance = new Timer()
        }
        return instance
    }
}
