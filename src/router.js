import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '*',
      redirect : '/login'
    },
    {
      path: '/store',
      name: 'StoreIndex',
      component: () => import('./views/StoreIndex.vue'),
      children:[    
        {
          path: 'custom_order',
          name: 'CustomOrder',
          component: () => import('./components/CustomOrder.vue'),
        },
        {
          path: 'single_item/:itemId',
          name: 'SingleItem',
          component: () => import('./components/Singleitem.vue'),
        },
      ],
    },
    {
      path: '/store/checkout',
      name: 'Checkout',
      component: () => import('./views/checkout.vue'),
      children : [
        {
          path: '',
          name: 'Orderdata',
          component: () => import('./components/Orderdata.vue'),
        },
      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      children:[
        {
          path: 'products',
          name: 'Product',
          component: () => import('./components/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('./components/Coupon.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orderlist',
          name: 'Orderlist',
          component: () => import('./components/OrderList.vue'),
          meta: { requiresAuth: true }
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    
  ]
})
