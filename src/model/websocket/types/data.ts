import Packet from '@/model/websocket/types/packet';

export interface DataPacket extends Packet {
  type: 'data';
  'snitch-alerts': SnitchAlertJson[];
}

export interface SnitchAlertJson {
  time: number;
  player: string;
  action: string;

  snitch: {
    location: {
      x: number;
      y: number;
      z: number;
      world: string;
    };
    name: string;
    group: string;
    type: string;
  };
}
