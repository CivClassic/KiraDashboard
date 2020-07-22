import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $wsConnect: (token: string) => null;
    $wsDisconnect: () => null;
    $wsSend: (data: object) => null;
  }
}
