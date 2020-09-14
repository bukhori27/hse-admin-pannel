// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import vSelect from 'vue-select'

import VuePaginate from 'vue-paginate'
// import VuePaginator from 'vuejs-paginator'
// import axios from 'axios'

Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)
Vue.use(VuePaginate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // axios,
  template: '<App/>',
  components: {
    App,
    'vue-select': vSelect,
    // VPaginator: VuePaginator
  }
})
