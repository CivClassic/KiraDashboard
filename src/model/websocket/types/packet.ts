interface Packet {
  type: string;

  /**
   * We add the datetime received to the packet.
   */
  date: Date;
}

export default Packet;
