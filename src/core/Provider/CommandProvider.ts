import ServiceProvider from './ServiceProvider'

export default class CommandProvider extends ServiceProvider {

  protected register(): void {
    console.log('this.app', this.app)
    this.app.singleton('$command', () => {

    })
  }

}
