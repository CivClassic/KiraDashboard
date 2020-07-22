/* eslint-disable @typescript-eslint/no-explicit-any */

import { Module } from 'vuex';

const data: Module<any, any> = {
  state: {
    data: [],
  },

  getters: {
    data: (state) => state.data.sort((a: any, b: any) => b.date - a.date),
  },

  actions: {

  },

  mutations: {

    DATA_RECEIVED(state: any, message: any) {
      state.data.push(message);
    },

  },
};

export default data;
