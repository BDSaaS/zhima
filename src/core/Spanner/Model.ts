// import {UtilityFunction} from '@/core/Type/utility'
//
// interface ModelInterface {
//   namespaced: boolean
//   alias: string
//   state: Record<any, any>
//   mutations: Record<string, any>
//   actions: ActionsInterface
//   getters: Record<any, any>
//
//   data(): Record<any, any>
//
//   computed(): Record<any, any>
//
//   setGetters(): Record<any, any>
//
//   addEventListener(name: string, callback: UtilityFunction): void
//
//   registerEventListeners(): void
// }
//
// interface MutationsInterface {
//   [propName: string]: (state: ContextInterface) => {}
// }
//
// interface ActionsInterface {
//   [propName: string]: (context: ContextInterface) => {}
// }
//
// interface ContextInterface {
//   state: Record<any, any>
//
//   commit(name: string, payload: any)
// }
//
// /**
//  * Class Model 模型类 Vuex适用 亦可修改为其他
//  * 1.首先搞明白数据的来源 <1>通过request获取 <2>通过获取存储的内容获取
//  * 2.Model的作用
//  */
// export default abstract class Model implements ModelInterface {
//   public namespaced
//   public alias
//   public state
//   public mutations
//   public actions
//   public getters
//
//   protected constructor() {
//     // namespaced
//     this.namespaced = true
//     // alias
//     this.alias = ''
//     // state
//     this.state = this.data()
//     // mutations
//     this.mutations = {}
//     // actions
//     this.actions = {}
//     // getters
//     this.getters = this.setGetters()
//     // register EventListeners
//     this.registerEventListeners()
//   }
//
//   public data() {
//     return {}
//   }
//
//   public computed() {
//     return {
//       state() {
//         return this.state
//       },
//     }
//   }
//
//   public setGetters() {
//     return this.computed()
//   }
//
//   /**
//    * Method addEventListener
//    * @param name
//    * @param callback
//    */
//   public addEventListener(name, callback) {
//     // // 注册 mutations
//     // this.mutations[name] = (state, payload) => {
//     //   callback.call(this, state, payload)
//     // }
//     // // 注册 actions
//     // this.actions[name] = (context, payload) => {
//     //   context.commit(name, payload)
//     // }
//   }
//
//   /**
//    * Method registerEventListeners
//    * 批量注册监听
//    */
//   public registerEventListeners() {
//     // this.addEventListener(name,()=>{})
//     // this.addEventListener(name,()=>{})
//     // this.addEventListener(name,()=>{})
//   }
// }
