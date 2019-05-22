// 官方套件
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

// 自訂元件
import App from './App.vue';
import CurrencyFilter from './filters/currency';
import './bus'

// 啟用套件 & 元件
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.component('Loading',Loading);
Vue.filter('currency', CurrencyFilter);

// 修正跨域登入
axios.defaults.withCredentials = true;

// '檢查用戶是否仍持續登入' API 搭配 導航守衛 => 驗證登入成功後即切換網址
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
      const api =`${process.env.VUE_APP_APIPATH}/api/user/check`
          
      axios.post(api).then((response) =>{
        //console.log(response.data)
        if(response.data.success){
          next();
        } else{
          next({path:'/login'})
        }
    })
  } else {
    next();
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
