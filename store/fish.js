import Api from '~/plugins/api/_resource.js'

export default () => {
  return {
    namespaced: true,
    state: {
      items: [],
    },
    mutations: {
      setFish(state, items) {
        let data = items.items
        for (var i in data) if (data.hasOwnProperty(i)) {
          state.items.push(data[i])
        }
      }
    },
    actions: {
      getFish({commit}) {
        return Api.get('/getProductsByCategory?category=2')
          .then(res => res.data)
          .then(res =>{
            commit('setFish', {items: res})
          })
      }
    }
  }
}
