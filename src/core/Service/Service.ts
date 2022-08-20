import {IApplicationInstance} from '../Type/Interface'

export default abstract class Service {
  protected app: IApplicationInstance

  constructor(app: IApplicationInstance) {
    this.app = app
  }

}
