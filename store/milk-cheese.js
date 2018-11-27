import Api from '~/plugins/api/_resource.js'

export default () => {
  return {
    namespaced: true,
    state: {
      items: [],
    },
    mutations: {
      setMilkCheese(state, items) {
        let data = items.items
        for (var i in data) if (data.hasOwnProperty(i)) {
          state.items.push(data[i])
        }
      }
    },
    actions: {
      getMilkCheese({commit}) {
        return Api.get('/getProductsByCategory?category=3')
          .then(res => res.data)
          .then(res =>{
            commit('setMilkCheese', {items: res})
          })
      }
    }
  }
}
