let config = {
  apiHost: apiHost(),
  emptyHost: '',
  staticPrefix: staticPrefix(),
  queueRequestHost: 'http://127.0.0.1:5000',
  frontHost: frontHost(),
  env: getEnv(),
  deviceWidth: {
    pc: 8024,
    tablet: 1023,
    phone: 639
  },
  deviceOffset: deviceOffset, //какой сейчас должен быть отступ
  deviceType: deviceType, //какой сейчас тип устройства  (pc, tablet, phone)
}

function getEnv () {
  return process.env.appEnv
}

//apiHost
function apiHost () {

  const env = getEnv()

  switch (env) {
    case 'DEV':
      return 'http://127.0.0.1:8080'
  }
}

function frontHost () {

  const env = getEnv()

  switch (env) {
    case 'DEV':
      return 'localhost:3000'
  }
}

//staticPrefix
function staticPrefix () {
  return ~['DEV', 'HOME'].indexOf(getEnv()) ?  '' : '/_nuxt'
}


//width = ширина экрана (window.outerWidth)
function deviceOffset (width) {

  //phone
  if (width <= config.deviceWidth.phone) {

    //iphone 5
    if (width == 320) {
      return 10
    }

    return 16

    //tablet
  } else if (width <= config.deviceWidth.tablet) {

    return 32
  }

  //pc
  return 32
}

//width = ширина экрана (window.outerWidth)
function deviceType (width) {

  //mobile mode
  if (width <= config.deviceWidth.phone) {

    return 'phone'

  } else if (width <= config.deviceWidth.tablet) {

    return 'tablet'
  }

  return 'pc'
}

export default config
