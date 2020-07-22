import _Vue from 'vue';
import { Store } from 'vuex';

function WebsocketPlugin(
  Vue: typeof _Vue,
  options: WebsocketPluginsOptions,
): void {
  let ws: WebSocket;

  /* eslint-disable no-param-reassign */
  Vue.prototype.$wsConnect = (token: string) => {
    ws = new WebSocket(options.baseUrl + token);

    console.log(ws.url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      data.date = new Date();

      options.store.commit('DATA_RECEIVED', data);
    };

    ws.onclose = (event) => {
      if (event) {
        if (event.code !== 1000) {
          const reconnectInterval = options.reconnectInterval || 3000;
          setTimeout(() => {
            Vue.prototype.$webSocketsConnect();
          }, reconnectInterval);
        }
      }
    };

    ws.onerror = (error) => {
      console.log(error);
      ws.close();
    };
  };

  Vue.prototype.$wsDisconnect = () => {
    ws.close();
  };

  Vue.prototype.$wsSend = (data: object) => {
    ws.send(JSON.stringify(data));
  };
}

export interface WebsocketPluginsOptions {
  baseUrl: string;
  reconnectInterval?: number;
  store: Store<object>;
}

export default WebsocketPlugin;
