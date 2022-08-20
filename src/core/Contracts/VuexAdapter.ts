// import Exception from '../Libs/Exception'
// import Lib from '../Libs/Lib'
// import {UtilityFunction} from '@/core/Type/utility'
//
// interface VuexAdapterInterface {
//   // createStore(options: Record<any, any>)
//
// }
//
// interface StoreInterface {
//
// }
//
// interface createStoreOptionsInterface {
//   state?()
//
//   getters?: {}
//
//   someMutation?()
//
//   mutations?: {
//     increment(state: Record<any, any>)
//   }
//
//   actions?: {
//     increment(context: { commit(name: string) }): {}
//   }
//
//   modules?: Record<string, any>
// }
//
// /**
//  * Class VuexAdapter
//  * Vuex 适配器
//  */
// export default class VuexAdapter {
//   createStoreFunc: UtilityFunction
//   modelContainer: Record<any, any>
//
//   constructor(createStore) {
//     if (!Lib.isFunction(createStore)) {
//       throw new Exception('VuexAdapter Error', 'The createStore must be an Function')
//     }
//     this.createStoreFunc = createStore
//     // 模型容器最终注入modules
//     this.modelContainer = {}
//     // setModules
//     this.setModules()
//   }
//
//   createStore(options: createStoreOptionsInterface): StoreInterface {
//     return this.createStoreFunc(options)
//   }
//
//   /**
//    * Method setModules
//    */
//   setModules() {
//     try {
//       let jss = null
//       // "@/app/store/" directory does not exist
//       try {
//         // require.context 报警告 "webpack-env"
//         jss = require.context(`@/app/store/`, true, /\.ts$/)
//       } catch (error) {
//         console.warn('"@/app/store/" directory does not exist. You cannot use Vuex')
//         return
//       }
//       const modules = jss.keys().reduce((modules, modulePath) => {
//         const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//         const value = jss(modulePath)
//         modules[moduleName] = value.default
//         return modules
//       }, {})
//       // Object
//       if (Lib.isObject(modules)) {
//         Object.keys(modules).forEach((className) => {
//           let model = new modules[className]()
//           let obj = {}
//           obj[model.alias] = model
//           Object.assign(this.modelContainer, obj)
//         })
//       }
//     } catch (e) {
//       throw new Exception(`@/app/store/ ${e.message}`, 'StorePathError')
//     }
//
//   }
//
//   /**
//    * Method getStore
//    * @returns store instance
//    */
//   getStore() {
//     return this.createStore({
//       modules: this.modelContainer,
//     })
//   }
// }
