import Api from '~/plugins/api/_resource.js'

export default () => {
  return {
    namespaced: true,
    state: {
      items: [],
    },
    mutations: {
      setMeat(state, items) {
        let data = items.items
        for (var i in data) if (data.hasOwnProperty(i)) {
          state.items.push(data[i])
        }
      }
    },
    actions: {
      getMeat({commit}) {
        return Api.get('/getProductsByCategory?category=1')
          .then(res => res.data)
          .then(res =>{
            commit('setMeat', {items: res})
          })
      }
    }
  }
}
