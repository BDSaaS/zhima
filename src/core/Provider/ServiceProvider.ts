import {IApplicationInstance} from '../Type/Interface'

export default abstract class ServiceProvider {
	protected app: IApplicationInstance

	constructor(app: IApplicationInstance) {
		this.app = app
		this.register()
	}

	public register(): void {
		console.log('Service is already registered')
	}
}
