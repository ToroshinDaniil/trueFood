import Vue from 'vue'
import config from '../config.js'

Vue.prototype.relativePath = function (path) { return config.staticPrefix + path}
const gl = typeof window != 'undefined' ? window : global
gl.Utils = require('../utils.js').default
Vue.prototype.relativePath = function (path) { return config.staticPrefix + path}
