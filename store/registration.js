import Api from '~/plugins/api/_resource.js'

export default () => {
    return {
        namespaced: true,
        actions: {
            addUser({commit}, form) {
                return Api.post('/registration', form)
            }
        }
    }
}