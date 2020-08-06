/* eslint-disable class-methods-use-this */

import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import handleWebsocketMessage from '@/util/handleWebsocketMessage';

const baseUrl = 'wss://mc.civclassic.com:14314?applicationId=kiradashboard&apiVersion=1&apiToken=';

export enum WebsocketStatus {
  DISCONNECTED,
  CONNECTING,
  CONNECTED,
  INVALID_TOKEN,
}

@Module({
  name: 'websocket',
  namespaced: true,
})
export default class Websocket extends VuexModule {
  status = WebsocketStatus.DISCONNECTED;

  websocket: WebSocket | null = null;

  @Mutation
  SET_WEBSOCKET_STATUS(status: WebsocketStatus) {
    this.status = status;
  }

  get websocketStatus(): WebsocketStatus {
    return this.status;
  }

  @Mutation
  SET_WEBSOCKET(socket: WebSocket) {
    this.websocket = socket;
  }

  @Action
  connect(token: string) {
    this.context.commit('SET_WEBSOCKET', null);
    this.context.commit('SET_WEBSOCKET_STATUS', WebsocketStatus.CONNECTING);

    const ws = new WebSocket(baseUrl + token);

    ws.onerror = (error) => {
      console.error(error);
      this.context.commit('SET_WEBSOCKET_STATUS', WebsocketStatus.DISCONNECTED);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      data.date = new Date(); // Add the current timestamp to each message

      // The only thing we care about handling here is whether or not
      // we should set the state to connected. Everything else can get handled externally
      if (data.type === 'auth') {
        if (data.valid) {
          this.context.commit('SET_WEBSOCKET_STATUS', WebsocketStatus.CONNECTED);
          localStorage.kiraToken = token;
        }
      }

      /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
      // @ts-ignore
      handleWebsocketMessage(data, this.store);
    };

    ws.onclose = (event) => {
      if (event.code === 1008) {
        this.context.commit('SET_WEBSOCKET_STATUS', WebsocketStatus.INVALID_TOKEN);
        return;
      }

      this.context.commit('SET_WEBSOCKET_STATUS', WebsocketStatus.DISCONNECTED);

      if (event.code !== 1000) {
        const reconnectInterval = 3000;

        setTimeout(() => {
          this.context.dispatch('connect', token);
        }, reconnectInterval);
      }
    };

    this.context.commit('SET_WEBSOCKET', ws);
  }
}
