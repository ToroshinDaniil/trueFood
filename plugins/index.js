import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

Vue.component('v-container', require('../components/grid/container.vue').default)
Vue.component('v-grid', require('../components/grid/grid.vue').default)
Vue.component('v-grid-cell', require('../components/grid/cell.vue').default)
Vue.component('btn', require('../components/btn.vue').default)
Vue.component('small-btn', require('../components/small-btn.vue').default)
Vue.component('text-small', require('../components/texts/text-small.vue').default)
Vue.component('text-middle', require('../components/texts/text-middle.vue').default)
Vue.component('text-title', require('../components/texts/text-title.vue').default)
Vue.component('select2-form', require('../components/select2-form.vue').default)
Vue.component('product-item', require('../components/product-item.vue').default)
Vue.component('input-form', require('../components/input-form.vue').default)



