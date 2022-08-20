import ServiceProvider from './ServiceProvider'

export default class CommandProvider extends ServiceProvider {

  protected register(): void {
    this.app.singleton('$command', () => {

    })
  }

}
