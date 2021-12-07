import Exception from "../../Libs/Exception";

/**
 * Timer status
 * 'Waiting' 等待/尚未执行 | 'Running' 执行中 | 'Paused' 已暂停 | 'Closed' 已关闭 | 'Undefined' 尚未定义
 */
type Status = 'Waiting' | 'Running' | 'Paused' | 'Closed' | 'Undefined'
// Timer Mode
type Mode = 'setInterval' | 'setTimeout' | 'Interval' | 'Timeout'

interface InterfaceTimer {
    name: string
    mode: Mode
    id: number | null
    executionTime: number
    status: Status
    callback
}

/**
 * Class Timer
 * 定时器
 * @example TimerInstance.setMode('setTimeout').dispatch('yu-ying.recall',5000,()=>{}) setMode 设置模式 setInterval 分发 dispatch
 * @author SunnyXu <xy@ztes.com>
 */

export default class Timer {
    // instance 实例
    protected static instance: object = null
    // queue 执行队列
    private queue: InterfaceTimer[] = []
    // mode 定时器模式
    private mode: Mode = 'setInterval'

    /**
     * dispatch
     * Timer dispatch * 核心方法 分发【添加并执行】
     * @param name
     * @param time
     * @param callback
     */
    public dispatch(name: string, time: number, callback) {
        this.add(name, time, callback).run(name)
        this.mode = 'setInterval'
    }

    /**
     * run
     * Run timer
     * @param name Timer name
     */
    public run(name: string) {
        const timer = this.has(name)
        // Waiting to run
        if (timer && timer.status === 'Waiting' || 'Paused' || 'Closed') {
            timer.status = 'Running'
            // 运行
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

    /**
     * setInterval
     * @param callback
     * @param time
     */
    public setInterval(callback, time: number): number {
        return setInterval(callback, time)
    }

    /**
     * setTimeout
     * @param callback
     * @param time
     * @return number
     */
    public setTimeout(callback, time: number): number {
        return setTimeout(callback, time)
    }

    /**
     * close
     * Close timer 关闭定时器
     * @param name
     * @param status
     */
    public close(name: string | string[], status: Status = 'Closed') {
        if (Array.isArray(name)) {
            name.map((t) => {
                this.close(t)
            })
        } else {
            const timer = this.has(name)
            if (timer) {
                if (timer.mode === 'setTimeout') {
                    clearTimeout(timer.id)
                } else if (timer.mode === 'setInterval') {
                    clearInterval(timer.id)
                }
                timer.status = status
                // Update
                this.updateTimer(timer)
            }
        }
    }

    /**
     * pause
     * Pause timer 暂停定时器
     * @param name
     */
    public pause(name?: string | string[]) {
        if (!name) {
            this.queue.map((timer) => {
                this.pause(timer.name)
            })
        } else if (Array.isArray(name)) {
            name.map((n) => {
                this.pause(n)
            })
        } else {
            const timer = this.has(name)
            if (timer && timer.status === 'Running') {
                this.close(name, 'Paused')
            }
        }
    }

    /**
     * clear
     * 清除定时器和对列
     * @param name
     */
    public clear(name?: string | string[]) {
        if (!name) {
            this.queue.map((timer) => {
                this.clear(timer.name)
            })
        } else if (Array.isArray(name)) {
            name.map((n) => {
                this.clear(n)
            })
        } else {
            const timer = this.has(name)
            // 运行中
            if (timer && timer.status === 'Running') {
                this.close(name)
            }
            this.remove(name)
        }
    }

    /**
     * join
     * As add add方法别名
     * @param name
     * @param time
     * @param callback
     */
    public join(name: string, time: number, callback) {
        return this.add(name, time, callback)
    }

    /**
     * add
     * Add timer to the queue 添加一个定时器到对列
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

    /**
     * remove
     * Remove queue's timer 从对列移除一个定时器
     * @param name
     */
    public remove(name?: string | string[]) {
        if (!name) {
            this.setQueue([])
        } else if (Array.isArray(name)) {
            name.map(n => {
                this.remove(n)
            })
        } else {
            const timer = this.has(name)
            if (timer && timer.status !== 'Running') {
                const queue = this.queue.filter(t => {
                    return name !== t.name
                })
                this.setQueue(queue)
            } else if (timer && timer.status === 'Running') {
                this.close(name)
            }
        }
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
            mode: this.mode,
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
     * setMode
     * @param mode
     */
    public setMode(mode: Mode) {
        this.mode = mode
        return this
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
