const appEnv = process.env.APP_ENV || 'DEV'
const route = require('./routes.js')
let filterRoute = (process.env.FILTER_ROUTE || '')

if (filterRoute) {
  filterRoute = filterRoute.split(',')
  console.log('filterRoute', filterRoute)
}

function regExp(regExp, text) {
  return new RegExp(regExp).test(text)
}
module.exports = {
  /*
  ** Headers of the page
  */
  env: {
    appEnv: appEnv
  },

  performance: {
    prefetch: false
  },

  head: {
    title: 'truefood',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'diploma' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
      __dangerouslyDisableSanitizers: ['script']


  },
    css: [
        {
            src: './assets/css/main.sass',
            lang: 'sass'
        },
        '~/assets/css/flex.css',
        '~/assets/css/div-table.css',
    ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    '~/plugins/index',
    '~/plugins/globals', //200kb
  ],
  router: {
    extendRoutes(routes) {
      route.forEach(r => {

        if (filterRoute.length) {

          if (~filterRoute.indexOf(r.name)) {
            routes.push(r)
          }

        } else {
          routes.push(r)
        }
      })
    },
    //при переходе - на все страницы идем наверх
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  render: {
    resourceHints: false,
    bundleRenderer: {
      shouldPreload: () => false
    }
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {

      //для типовых страниц чтоб работал html который пришел с сервера как строка
      //- и клики чтоб работали
      if (appEnv == 'DEV') {
        config.resolve.alias['vue'] = 'vue/dist/vue.js'
      } else {
        config.resolve.alias['vue'] = 'vue/dist/vue.min.js'
      }

      let urlLoader = config.module.rules.find(rule => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/

      config.module.rules.push({
        test (path) {

          if (!regExp(/\.(svg)(\?\S*)?$/, path)) {
            return false
          }

          return path.indexOf('svg-url') != -1
        },
        loader: 'svg-url-loader',
        query: {
          noquotes: false,
          limit: 10000,
          name: 'static/[name].[hash:7].[ext]'
        }
      })

      config.module.rules.push({
        test (path) {

          if (!regExp(/\.(svg)(\?\S*)?$/, path)) {
            return false
          }

          return path.indexOf('svg-url') == -1
        },
        loader: 'svg-inline-loader',
        query: {
          removeSVGTagAttrs: false,
          limit: 40000,
          name: 'static/[name].[hash:7].[ext]'
        }
      })

    },
    postcss: [require('autoprefixer')({browsers: ['last 33 versions']})],

  }
}
