import { Packet } from '@/model/websocket/packet';

export interface DataPacket extends Packet {
  type: 'data';
  'group-messages': GroupMessageJson[];
  'snitch-alerts': SnitchAlertJson[];
  skynet: SkynetJson[];
  'new-players': NewPlayerJson[];
}

export interface GroupMessageJson {
  time: number;
  group: string;
  player: string;
  message: string;
}

export interface SnitchAlertJson {
  time: number;
  player: string;
  action: 'ENTER' | 'LOGIN' | 'LOGOUT';

  snitch: {
    location: {
      x: number;
      y: number;
      z: number;
      world: string;
    };
    name: string;
    group: string;
    type: 'LOGGING' | 'ENTRY';
  };
}

export interface SkynetJson {
  time: number;
  player: string;
  action: 'LOGIN' | 'LOGOUT';
}

export interface NewPlayerJson {
  time: number;
  player: string;
}
