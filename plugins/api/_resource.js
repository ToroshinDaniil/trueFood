import axios from 'axios'
import Utils from '~/plugins/utils.js'
import appConfig from '../config.js'

const Api = class {

  static initHeader () {

    let impersonal = 'server__side__impersonal'
      let auth = ''

    //axios impersonal header
    if (process.browser) {

      impersonal = Utils.setImpersonal()
    }

    //чтоб кука сохранялась на крос домене
    // axios.interceptors.request.use(function (config) {
    //
    //   if (~(config.url.indexOf(appConfig.apiHost))) {
    //
    //     config.withCredentials = true;
    //     config.headers.common['impersonal'] = 'Basic ' + impersonal
    //
    //   } else {
    //
    //     config.withCredentials = false;
    //
    //     if (config.headers.common) {
    //       delete config.headers.common['impersonal']
    //     }
    //   }
    //
    //   return config
    //
    // }, function (error) {
    //
    //   return Promise.reject(error)
    // })

      axios.interceptors.request.use(
          config => {
              if (localStorage.token) {
                  config.headers.Authorization = 'Bearer ' + localStorage.token;
              }
              return config;
          },
          error => Promise.reject(error)
      );

// Add a response interceptor
      axios.interceptors.response.use(function (response) {
          return response;
      }, function (error) {
          // Do something with response error
          return Promise.reject(error);
      });

  }
  // beforePromise = {} = если мы уже 2 раз пытаемся отправить тот же запрос
  static captchaRequest (request, data = {}, method = 'post', beforePromise = {}) {
    let options = {
      headers: {
          "Access-Control-Allow-Origin": "*"
      }
    }

    if (data && data['captcha'] && ~(request.indexOf(appConfig.apiHost))) {

      options.headers['Captcha'] = data['captcha']

      delete data['captcha']
    }

    if (method == 'get') {
      data = Object.assign({}, options, data)
    }

    return new Promise((resolve, reject) =>

      axios[method](request, data, options)
        .then (res => {

          const expTime = res.headers['captcha-cookie-expiration-time']

          if (expTime) {

            Utils.Cookie.setCookie('captcha__valid', 'valid', {expires: parseInt(expTime), path: '/'})
          }

          //с предыдущего промиса ответ отдаем
          if (beforePromise.resolve) {
            return beforePromise.resolve(res)
          }

            return resolve(res)
        })
    )
  }

}

Object.assign(Api, {
  get: (request, args = {}, options = {host: 'apiHost'}) => {

    const requestHost = appConfig[options['host']] + request
      args['timeout'] = process.browser ? 15000 : 2000

    return Api.captchaRequest(requestHost, args, 'get')

  },
  delete: (request) => axios.delete(appConfig.apiHost + request),
  put: (request, data = {}) => Api.captchaRequest(appConfig.apiHost + request, data, 'put'),
  post: (request, data = {}, options = {host: 'apiHost'}) => Api.captchaRequest(appConfig[options['host']] + request, data, 'post')
});

Api.initHeader()

export default Api
