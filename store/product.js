import Api from '~/plugins/api/_resource.js'

export default () => {
    return {
        namespaced: true,
        state: {
          items: [],
          currentItem: {},
        },
        mutations: {
          setProducts(state, items) {
              state.items = items
          },
          setItem(state, item) {
              state.currentItem = item
          }
        },
        actions: {
            addProduct({commit}, form) {
                return Api.post('/addProduct', form)
            },
            getProductsByUserId({commit}, id) {
                return Api.get('/getProductsByUser/'+id)
                    .then(res => res.data)
                    .then(res =>{
                        commit('setProducts', {items: res})
                    })
            },
            getProductById({commit},id) {
                return Api.get('/getProductById?id='+id)
                    .then(res => res.data)
                    .then(res => {
                        commit('setItem', res)
                    })
            },
            deleteProductById({commit}, id) {
                return Api.delete('/deleteProduct?id='+id)
            },
            getDocument({commit}, id) {
                return Api.get('/getDocument/'+id)
            }
        }
    }
}