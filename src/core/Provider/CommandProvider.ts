import ServiceProvider from './ServiceProvider'

export default class CommandProvider extends ServiceProvider {

	public register(): void {
		this.app.singleton('$command', () => {

		})
	}

}
