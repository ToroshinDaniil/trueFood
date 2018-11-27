const path = require('path')

const component = (cmp) => {
  if(path.sep == '/') {
    // lin
    return path.resolve(__dirname, cmp)
  }

  // win
  return path.resolve(__dirname, cmp)
    .split(path.sep)
    .join('\\\\');
}


module.exports = [
  { //main page
    name: 'index',
    path: '/',
    component: component('page/index.vue')
  },
    { //main page
        name: 'about',
        path: '/about',
        component: component('page/about.vue'),
    },

  { //main page
    name: 'milk-cheese',
    path: '/product/milk-cheese',
    component: component('page/product/milk-cheese.vue'),
  },
    { //main page
        name: 'fish',
        path: '/product/fish',
        component: component('page/product/fish.vue'),
    },
    { //main page
        name: 'vegetableFruits',
        path: '/product/vegetableFruits',
        component: component('page/product/vegetableFruits.vue'),
    },
    { //main page
        name: 'meat',
        path: '/product/meat',
        component: component('page/product/meat.vue'),
    },
    { //Страница продукта молока-сыра
        name: 'product',
        path: '/product/:id',
        component: component('page/product/product.vue')
    },
    {
        name: 'registration',
        path: '/registration',
        component: component('page/registration.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: component('page/login.vue')
    },
    {
        name: 'add-product',
        path: '/addProduct',
        component: component('page/product/add-product.vue')
    },
    {
        name: 'user-products',
        path: '/products',
        component: component('page/product/products.vue')
    }


]
