/* eslint-disable class-methods-use-this */

import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { SnitchAlertJson } from '@/model/websocket/data';

@Module({
  name: 'snitches',
  namespaced: true,
})
export default class Snitches extends VuexModule {
  snitchHits: SnitchAlertJson[] = []

  @Mutation
  ADD_HIT(snitchHit: SnitchAlertJson) {
    this.snitchHits.push(snitchHit);
  }

  @Action({ commit: 'ADD_HIT' })
  addSnitchHit(alert: SnitchAlertJson) {
    return alert;
  }
}
