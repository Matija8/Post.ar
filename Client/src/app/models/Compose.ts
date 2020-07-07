
export type editorSize = 'normal' | 'minimized';

export interface EditorMessage {
  to: string;
  subject: string;
  messageText: string;
}

export const makeEmptyEditorMsg = function createEmptyEditorMessage(): EditorMessage {
  return {to: '', subject: '', messageText: ''};
};

export const checkEmpty = function checkIfEditorMessageIsEmpty(message: EditorMessage) {
  return Object.values(message).every((field: string) => field === '');
};

export interface EditorData {
  msg: EditorMessage;
  size: editorSize;
}
