import { Packet, SendablePacket } from '@/model/websocket/packet';

export interface InGameResponsePacket extends Packet {
  type: 'ingame-response';
  identifier: string;
  response: string;
}

export interface InGamePacket extends SendablePacket {
  type: 'in-game';

  identifier: string;
  command: string;
}
