import Vue from 'vue';
import WebsocketPlugin from '@/plugins/websocket';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(WebsocketPlugin, {
  baseUrl: 'wss://mc.civclassic.com:14314?applicationId=kiradashboard&apiVersion=1&apiToken=',
  store,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
