import Vue from 'vue';
import Vuex from 'vuex';
import Snitches from '@/store/modules/snitches';
import Websocket from '@/store/modules/websocket';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    websocket: Websocket,
    snitches: Snitches,
  },
});
