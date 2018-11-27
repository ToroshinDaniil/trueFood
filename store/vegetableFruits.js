import Api from '~/plugins/api/_resource.js'

export default () => {
  return {
    namespaced: true,
    state: {
      items: [],
    },
    mutations: {
      setVegetableFruits(state, items) {
        let data = items.items
        for (var i in data) if (data.hasOwnProperty(i)) {
          state.items.push(data[i])
        }
      }
    },
    actions: {
      getVegetableFruits({commit}) {
        return Api.get('/getProductsByCategory?category=4')
          .then(res => res.data)
          .then(res =>{
            commit('setVegetableFruits', {items: res})
          })
      }
    }
  }
}
