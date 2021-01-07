import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

import { Swipe, SwipeItem } from 'vant';
import store from './store'

Vue.use(Swipe);
Vue.use(SwipeItem);



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
