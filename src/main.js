import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueAxios, axios)

Vue.use(VueGeolocation)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
