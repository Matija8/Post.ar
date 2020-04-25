export interface Message {
  id: number;
  subject?: string;
  cc: string;
  messageText: string;
  is_starred?: boolean;
  sender?: string;
  sentTo?: string;
}


export interface RMessage extends Message {
  sender: string;
}

export function isReceived(msg: Message): msg is RMessage {
  if ('sender' in msg) {
    return true;
  }
  return false;
}


export interface SMessage extends Message {
  sentTo: string;
}

export function isSent(msg: Message): msg is SMessage {
  if ('sentTo' in msg) {
    return true;
  }
  return false;
}
