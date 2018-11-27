import Vue from 'vue'
import Vuex from 'vuex'
import Config from '~/plugins/config'
import Utils from '~/plugins/utils.js'
import Api from '~/plugins/api/_resource.js'



import milkCheese from './milk-cheese.js'
import fish from './fish.js'
import registration from './registration.js'
import signIn from './sign-in.js'
import product from './product.js'
import meat from './meat.js'
import vegetableFruits from './vegetableFruits.js'



Vue.use(Vuex)

const loggerPlugin = store => {
  // вызывается после инициализации хранилища
  store.subscribe((mutation, state) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.

    //нас интересуют запросы только которые логируются
    if (~mutation.type.indexOf('initRequest') && store.state.requestLogger) {

      //@todo store.state.requestLogger.initRequest()
      //console.log('loggerPlugin initRequest', mutation.type)
    }

    // запрос закончился
    if (~mutation.type.indexOf('endRequest') && store.state.requestLogger) {

      //@todo store.state.requestLogger.endRequest()
      //console.log('loggerPlugin endRequest', mutation.type)
    }
  })
}
const store = () => new Vuex.Store({
  modules: {
      milkCheese: milkCheese(),
      registration: registration(),
      signIn: signIn(),
      product: product(),
      fish: fish(),
      meat: meat(),
      vegetableFruits: vegetableFruits()
  },
  plugins: [loggerPlugin],
  state: {
    counter: 0,
    requestLogger: null,
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    //храним ссылку на логгер
    requestLogger (state, logger) {
      state.requestLogger = logger
    }
  },
  actions: {

      signIn({commit}, form) {
          return Api.post('/sign-in', form)
              .then(res => res.data)
              .then(res =>{
                  window.localStorage.setItem('token', res.token)
              })
      },
      signOut({commit}) {
          window.localStorage.removeItem('token')
      },

    increment ({commit}) {
      return new Promise((resolve, reject) => {

        setTimeout(() => {
          commit('increment')
          resolve(true)
        }, 2000)
      })
    },
    nuxtServerInit({commit}, {req, res, store}) {
      return
    }
  }
})

export default store
