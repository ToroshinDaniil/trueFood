import Api from '~/plugins/api/_resource.js'
export default () => {
    return {
        namespaced: true,
        state: {
            userId: ''
        },
        mutations: {
            setUserId(state, item) {
                state.userId = item
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
            // getLog() {
            //     return window.localStorage.token
            //         .then(res => res.data)
            //         .then(res => {
            //
            //         })
            // }
            getCurrentUser({commit}) {
                return Api.get('/getCurrentUser')
                    .then(res => res.data)
                    .then(res => {
                        localStorage.setItem('id', res)
                        commit('setUserId', res)
                    })
            }
        }
    }
}