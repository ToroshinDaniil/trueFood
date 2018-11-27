import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _13fa5210 = () => import('../page/index.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _177b116a = () => import('../page/about.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _08eb0ce7 = () => import('../page/product/milk-cheese.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _fa0110ac = () => import('../page/product/fish.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _199835fe = () => import('../page/product/vegetableFruits.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _6880a39d = () => import('../page/product/meat.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _613d030d = () => import('../page/product/product.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _4feebf2a = () => import('../page/registration.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _44bc15b2 = () => import('../page/login.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _3a3eb0e1 = () => import('../page/product/add-product.vue' /* webpackChunkName: "" */).then(m => m.default || m)
const _6be20094 = () => import('../page/product/products.vue' /* webpackChunkName: "" */).then(m => m.default || m)



const scrollBehavior = function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _13fa5210,
			name: "index"
		},
		{
			path: "/about",
			component: _177b116a,
			name: "about"
		},
		{
			path: "/product/milk-cheese",
			component: _08eb0ce7,
			name: "milk-cheese"
		},
		{
			path: "/product/fish",
			component: _fa0110ac,
			name: "fish"
		},
		{
			path: "/product/vegetableFruits",
			component: _199835fe,
			name: "vegetableFruits"
		},
		{
			path: "/product/meat",
			component: _6880a39d,
			name: "meat"
		},
		{
			path: "/product/:id",
			component: _613d030d,
			name: "product"
		},
		{
			path: "/registration",
			component: _4feebf2a,
			name: "registration"
		},
		{
			path: "/login",
			component: _44bc15b2,
			name: "login"
		},
		{
			path: "/addProduct",
			component: _3a3eb0e1,
			name: "add-product"
		},
		{
			path: "/products",
			component: _6be20094,
			name: "user-products"
		}
    ],
    
    
    fallback: false
  })
}
