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

type messageType = 'inbox' | 'sent';

export interface TagData {
  messageId: string;
  type: messageType;
}

export const makeTagData = function convertMessageToTagDataForm(msg: Message): TagData {
  return {
    messageId: msg.message_id,
    type: msgType(msg),
  };
};

export const msgType = function getFolderNameOfMessage(msg: Message): messageType {
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

export class TagDataSet {
  private types: Map<messageType, Set<string>>;

  constructor() {
    this.types = new Map<messageType, Set<string>>();
  }

  add(message: TagData) {
    let msgIdsSet = this.types.get(message.type);
    if (!msgIdsSet) {
      msgIdsSet = new Set<string>();
      this.types.set(message.type, msgIdsSet);
    }
    msgIdsSet.add(message.messageId);
  }

  has(message: TagData): boolean {
    const msgIdsSet = this.types.get(message.type);
    return !!msgIdsSet && msgIdsSet.has(message.messageId);
  }

  delete(message: TagData): boolean {
    const msgIdsSet = this.types.get(message.type);
    return !!msgIdsSet && msgIdsSet.delete(message.messageId);
  }

  clear(): void {
    this.types = new Map<messageType, Set<string>>();
  }

  get size(): number {
    return this.values().length;
  }

  values(): TagData[] {
    const tagData = [];
    const setsByType = this.types.entries();
    for (const [type, messageId] of setsByType) {
      tagData.push({type, messageId});
    }
    return tagData;
  }
}
