import { Packet, SendablePacket } from '@/model/websocket/packet';

export interface InvalidTokenPacket extends Packet {
  type: 'auth';

  valid: false;
}

export interface ValidTokenPacket extends Packet {
  type: 'auth';

  valid: true;

  expires: number;
  chats: string[];
  snitches: string[];
  skynet: boolean;
}

export interface NewTokenPacket extends Packet {
  type: 'new-token';

  secret: string;
  expires: number;
}

export interface RequestNewTokenPacket extends SendablePacket {
  type: 'new-token';
}
