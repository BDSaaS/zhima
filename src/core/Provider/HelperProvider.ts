import ServiceProvider from './ServiceProvider'
import Helper from '../Helper/Helper'

export default class HelperProvider extends ServiceProvider {

	public register(): void {
		this.app.singleton('$helper', () => {
			return new Helper(this.app)
		})
	}

}
