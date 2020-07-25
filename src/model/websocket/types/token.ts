import Packet from '@/model/websocket/types/packet';

export interface AuthPacket extends Packet {
  type: 'auth';

  valid: boolean;
}

export interface InvalidTokenPacket extends AuthPacket {
  valid: false;
}

export interface ValidTokenPacket extends AuthPacket {
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
