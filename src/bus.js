import Vue from 'vue';
// 將變數 bus 掛載到 vue 的原型下
Vue.prototype.$bus = new Vue();

// 自定義方法 'messsage:push'
// message: 傳入參數 status: 樣式，預設值為 warning
// 目前用在 Product.vue