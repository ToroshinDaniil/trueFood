const api = {

  dispatch (method, options) {

    method = method.split('/')

    if (method.length < 2) {

      console.log('Error $api invalid method')
      return
    }

    let module = method[0]

    let action = method[1]

    if (!modules[module]) {

      console.log('Error $api invalid module')
      return
    }

    if (typeof modules[module][action] !== 'function') {

      console.log('Error $api invalid action')
      return
    }

    return modules[module][action](options)
  }
}

export default {

  install(Vue, options) {

    Vue.prototype.$api = api
  }
}

export { api }
