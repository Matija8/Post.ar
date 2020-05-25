export interface Message {
  messageId: string;
  content: string;
  timestamp?: number;
  from?: string;
  to?: string;
  isRead?: boolean;
  isStarred?: boolean;
  isDeleted?: boolean;

  // check model with server for these properties
  cc?: string;
  subject?: string;
}

export interface RMessage extends Message {
  from: string;
}

export interface SMessage extends Message {
  to: string;
}

export function isReceived(msg: Message): msg is RMessage {
  if ('from' in msg) {
    return true;
  }
  return false;
}

export function isSent(msg: Message): msg is SMessage {
  if ('to' in msg) {
    return true;
  }
  return false;
}
