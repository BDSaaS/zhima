import Application from '../Application'
import {IHelper} from '../Type/Interface'

export default abstract class Command {
  protected payload: any
  // 助手函数
  protected $helper: IHelper

  constructor(...payload: any[]) {
    this.payload = {...payload}
    this.$helper = Application.getService<IHelper>('$helper')
  }

  public abstract handle(...args: any[]): Promise<any>

}
