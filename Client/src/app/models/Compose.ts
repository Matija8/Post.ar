
export type editorSize = 'normal' | 'minimized';

export interface EditorMessage {
  to: string;
  cc: string; // string[]?
  bcc: string;
  subject: string;
  messageText: string;
}

export const makeEmptyEditorMsg = function createEmptyEditorMessage(): EditorMessage {
  return {to: '', cc: '', bcc: '', subject: '', messageText: ''};
};

interface ServerDraftFormat {
  subject: string;
  to: string;
  content: string;
}

export const toDraftable = function convertEditorToFormatForTheServerToSaveAsADraft(edMsg: EditorMessage): ServerDraftFormat {
  return {
    subject: edMsg.subject,
    to: edMsg.to,
    content: edMsg.messageText
  };
};

export const checkEmpty = function checkIfEditorMessageIsEmpty(message: EditorMessage) {
  return Object.values(message).every((field: string) => field === '');
};

export interface EditorData {
  msg: EditorMessage;
  size: editorSize;
}
