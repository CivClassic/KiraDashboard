import Packet from '@/model/websocket/types/packet';
import { Store } from 'vuex';
import { DataPacket } from '@/model/websocket/types/data';
import { getModule } from 'vuex-module-decorators';
import Snitches from '@/store/modules/snitches';

export default function handleWebsocketMessage(message: Packet, store: Store<object>) {
  if (message.type === 'data') {
    const packet = message as DataPacket;
    const snitchModule = getModule(Snitches, store);

    packet['snitch-alerts'].forEach((alert) => {
      snitchModule.addSnitchHit(alert);
    });
  }
}
