import Service from './Service'
import RESTful from '../Spanner/RESTful'
import Exception from '../Libs/Exception'
import Lib from '../Libs/Lib'
import qs from 'qs'

import {
	TContentType,
	TCarryData,
	IHelper,
	TApiRoute,
	IHttpSendConfig,
	THttpServiceParams,
	IApplicationInstance, TRequestMethod, IHttpConfig,
} from '../Type/Interface'
import {UtilityObject} from '../Type/utility'
import Application from '../Application'

/**
 * Class HttpService Http service
 *
 */

export default class HttpService extends Service {
	_http: any = null
	_api: UtilityObject = {}
	_headers: UtilityObject = {}
	_host = ''
	_isRESTful = true
	// RESTful操作库
	_RESTful: typeof RESTful
	// Carrying data
	_carryingData: UtilityObject = {}
	// mode
	_mode = 'REQUEST_PAYLOAD'
	// $helper
	$helper = null

	// _requestMiddleware: FunctionConstructor | ((callback: UtilityFunction) => void) = () => {
	// }
	_requestMiddleware: (res: any) => any
	_responseMiddleware: (res: any) => any

	/**
	 * _contentType Request type 请求类型
	 * 'application/json' 为 Request Payload 请求方式
	 * 'application/x-www-form-urlencoded;charset=UTF-8' 为 Form Data 请求方式 需QS配合使用
	 * OTHER Query String Parameters 为 _method = 'GET'
	 */

	// _contentType = 'application/json';

	/**
	 * Constructor
	 * @param {Object} app
	 * @param {Object} HTTP_ADAPTER_
	 * @param {String} HTTP_API
	 * @param {String} HTTP_HOST
	 * @param {Boolean} IS_RESTFUL
	 * @param {String} CONTENT_TYPE
	 * @param {Object} DATA_CARRYING
	 * @param {Function} REQUEST_MIDDLEWARE
	 * @param {Function} RESPONSE_MIDDLEWARE
	 */

	constructor(app: IApplicationInstance, {
		HTTP_ADAPTER_,
		HTTP_API,
		HTTP_HOST,
		IS_RESTFUL,
		CONTENT_TYPE,
		DATA_CARRYING,
		REQUEST_MIDDLEWARE,
		RESPONSE_MIDDLEWARE,
	}: THttpServiceParams) {
		super(app)
		// Setting http adapter
		this._http = HTTP_ADAPTER_ ?? this._http
		// Setting http api
		this._api = HTTP_API ?? this._api
		// Setting host
		this._host = HTTP_HOST ?? this._host
		// Is used RESTful
		this._isRESTful = IS_RESTFUL ?? true
		// import RESTful from '../spanners/RESTful';
		this._RESTful = RESTful ?? null
		// Setting Content-type
		this.setContentType(CONTENT_TYPE)
		// Setting Data-carrying 携带数据
		this.setDataCarry(DATA_CARRYING['REQUEST_HEADERS'], DATA_CARRYING['REQUEST_DATA'])
		// Setting request middleware 请求中间件 放弃回调方式
		this._requestMiddleware = Lib.isFunction(REQUEST_MIDDLEWARE) ? REQUEST_MIDDLEWARE : (request: any) => {
			return request
		}
		// Setting response middleware 响应中间件
		this._responseMiddleware = Lib.isFunction(RESPONSE_MIDDLEWARE) ? RESPONSE_MIDDLEWARE : (response: Promise<Response>) => {
			return response
		}
	}

	/**
	 * Method setContentType 设置请求类型
	 * @param {String} mode
	 */
	setContentType(mode: TContentType) {
		if (mode === 'REQUEST_PAYLOAD') {
			this._mode = mode
			// REQUEST_PAYLOAD
			this.setHeader('Content-Type', 'application/json')
		} else if (mode === 'FORM_DATA') {
			this._mode = mode
			// FORM_DATA
			this.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
		}
	}

	/**
	 * Method setDataCarry 处理携带数据
	 * @param {*} REQUEST_HEADERS
	 * @param {*} REQUEST_DATA
	 */
	setDataCarry(REQUEST_HEADERS: UtilityObject, REQUEST_DATA: UtilityObject) {
		if (REQUEST_HEADERS) {
			const headers = Object.keys(REQUEST_HEADERS)
			if (Array.isArray(headers)) {
				headers.map((name) => {
					this.carryingHandle(name, REQUEST_HEADERS[name], 'REQUEST_HEADERS')
				})
			}
		}
		if (REQUEST_DATA) {
			const data = Object.keys(REQUEST_DATA)
			if (Array.isArray(data)) {
				data.map((name) => {
					this.carryingHandle(name, REQUEST_DATA[name], 'REQUEST_DATA')
				})
			}
		}
	}

	/**
	 * Method carrayingHandle 携带数据处理
	 * @param {String} name
	 * @param {*} val
	 * @param {*} type
	 */
	carryingHandle(name: string, val: any, type: TCarryData = 'REQUEST_HEADERS') {
		if (name && val) {
			if (Lib.isFunction(val)) {
				try {
					if (type === 'REQUEST_HEADERS') {
						this.setHeader(name, val())
					} else if (type === 'REQUEST_DATA') {
						this.setData(name, val())
					}
				} catch (e) {
					console.warn('Application Error', e)
				}
			} else {
				let str = null
				// Get type
				if (val === 'LOCAL') {
					str = Application.getService<IHelper>('$helper').storage(name)
				} else if (val === 'SESSION') {
					str = Application.getService<IHelper>('$helper').session(name)
				} else if (val === 'COOKIES') {
					str = Application.getService<IHelper>('$helper').cookies(name)
				} else if (val === 'STORAGE') {
					// UNI-APP
					str = Application.getService<IHelper>('$helper').storage(name)
				}
				if (type === 'REQUEST_HEADERS') {
					this.setHeader(name, str)
				} else if (type === 'REQUEST_DATA') {
					this.setData(name, str)
				}
			}
		}
	}

	/**
	 * Method http 发送一个请求
	 * @param {String} apiRoute
	 * @param {JSON} data
	 * @param {Boolean} returnResponse
	 * @returns
	 */
	async http(apiRoute: string, data: Record<string, any>, returnResponse = false) {
		// Setting config parameters
		try {
			const config: IHttpConfig = {
				...this.getParameters(apiRoute, data),
				...{
					headers: this._headers,
				},
			}
			this._http.setConfig(config)
		} catch (error) {
			console.warn('Request config warn', error)
		}

		// Throw Exception
		try {
			// Run request middleware
			// this._requestMiddleware();
			return await this.request(returnResponse)
		} catch (error) {
			console.warn('Request interceptor warn', error)
		}
	}

	/**
	 * Send Request
	 * @param {Boolean} returnResponse 返回response还是response.data
	 * @returns {Promise<*|*>}
	 */
	async request(returnResponse: boolean) {
		// Send a request
		try {
			const response = await this._http.request()
			// Run response middleware
			try {
				const handle = this._responseMiddleware(response) as any
				return !returnResponse ? handle.data : handle
			} catch (error) {
				console.warn('Response middleware Error', error)
			}
			return !returnResponse ? response.data : response
		} catch (err: any) {
			// Error response
			if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求参数错误'
						break
					case 401:
						err.message = '未授权，请登录'
						break
					case 403:
						err.message = '跨域拒绝访问'
						break
					case 404:
						err.message = `请求地址出错: ${err.response.config.url}`
						break
					case 408:
						err.message = '请求超时'
						break
					case 500:
						err.message = '服务器内部错误'
						break
					case 501:
						err.message = '服务未实现'
						break
					case 502:
						err.message = '网关错误'
						break
					case 503:
						err.message = '服务不可用'
						break
					case 504:
						err.message = '网关超时'
						break
					case 505:
						err.message = 'HTTP版本不受支持'
						break
					default:
						break
				}
			}
			throw err
		}
	}

	/**
	 * Method Send 发送一个自定义请求
	 * @param apiRoute
	 * @param data
	 * @param config
	 * @returns {Promise<void>}
	 */
	async send(apiRoute: string, data: Record<string, any>, config: IHttpSendConfig = {}) {
		// Host
		if (config.host) {
			this._host = config.host
		}
		// Headers
		if (config.headers) {
			this.setHeaders(config.headers)
		}
		// Mode
		if (config.mode) {
			this.setContentType(config.mode)
		}
		// Send HTTP request
		return await this.http(apiRoute, data, true)
	}

	/**
	 * Method getParameters 从Api里读取请求方法、参数和地址
	 * @param {*} apiRoute
	 * @param {*} data
	 * @returns
	 */
	getParameters(apiRoute: string, data: Record<string, any>) {
		let routeParams: TApiRoute = this._api[apiRoute]
		// ApiRoute does not exist
		if (!routeParams && !apiRoute) {
			throw new Exception('The api route does not exist', 'ApiRouteError')
		} else if (!routeParams && apiRoute) {
			routeParams = [apiRoute]
		}

		let uri: string = ''
		let method: TRequestMethod = 'POST'
		let needAuth: boolean = true

		// Parameters handle
		switch (routeParams.length) {
			case 1:
				uri = routeParams[0]
				break
			case 2:
				uri = routeParams[0]
				method = routeParams[1] as TRequestMethod
				break
			case 3:
				uri = routeParams[0]
				method = routeParams[1] as TRequestMethod
				needAuth = routeParams[2] as boolean
				break
			default:
				throw new Exception('ApiRoute Error', 'The api route does not exist')
		}

		// toUpperCase
		method = method.toUpperCase() as TRequestMethod

		// Transformer Data
		const tfData = this.transformRESTfulData(uri, data)

		// Carrying data
		if (Object.keys(this._carryingData).length > 0) {
			// 携带数据被载荷给覆盖
			tfData.data = {
				...this._carryingData,
				...tfData.data,
			}
		}

		const objData = tfData.data

		let url = this._host.trim() + '/' + tfData.uri.trim()

		// FORM_DATA QS.stringify
		if (this._mode === 'FORM_DATA') {
			tfData.data = qs.stringify(tfData.data)
		}

		if (method === 'GET') {
			const requestUri = qs.stringify(data)
			url = requestUri ? (url + '?' + requestUri) : url
			// console.log('XHR', url);
		}

		return {
			url: url,
			method,
			data: tfData.data,
			auth: needAuth,
			params: {
				host: this._host.trim(),
				method: method,
				uri: tfData.uri.trim(),
				data: objData,
				auth: needAuth,
			},
		}
	}

	/**
	 * Method transformRESTfulData 使用扳手工具处理RESTful数据
	 * @param {*} uri
	 * @param {*} data
	 * @returns
	 */
	transformRESTfulData(uri: string, data: Record<string, any> = {}) {
		// RESTful handle RESRful 处理
		return (new this._RESTful(uri, data, this._isRESTful)).create()
	}

	/**
	 * Method setHeaders 设置Headers multiple
	 * @param {JSON|Object} config
	 */
	setHeaders(config = {}) {
		this._headers = config
	}

	/**
	 * Method setHeader 设置Headers single
	 * @param {String} name
	 * @param {String} val
	 */
	setHeader(name: string, val: any) {
		this._headers[name] = val
	}

	/**
	 * Method setData 设置携带数据 通过Data
	 * @param {*} name
	 * @param {*} val
	 */
	setData(name: string, val: any) {
		this._carryingData[name] = val
	}

	// responseStatus(errStatus) {
	//
	// }
}
