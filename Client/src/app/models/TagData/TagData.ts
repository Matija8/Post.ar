import { isReceived, Message } from '../Messages';


export type messageType = 'inbox' | 'sent';

export const msgType = function getFolderNameOfMessage(msg: Message): messageType {
  return isReceived(msg) ? 'inbox' : 'sent';
};

export interface TagData {
  messageId: string;
  type: messageType;
}

export const makeTagData = function convertMessageToTagDataForm(msg: Message): TagData {
  return {
    messageId: msg.messageId,
    type: msgType(msg),
  };
};
