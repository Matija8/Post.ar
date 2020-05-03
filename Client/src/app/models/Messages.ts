export interface Message {
  message_id: string;
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

export const msgType = function getFolderNameOfMessage(msg: Message) {
  return isReceived(msg) ? 'inbox' : 'sent';
};


export interface RMessage extends Message {
  from: string;
}

export function isReceived(msg: Message): msg is RMessage {
  if ('from' in msg) {
    return true;
  }
  return false;
}


export interface SMessage extends Message {
  to: string;
}

export function isSent(msg: Message): msg is SMessage {
  if ('to' in msg) {
    return true;
  }
  return false;
}
