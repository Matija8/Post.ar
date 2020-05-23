
export type editorSize = 'normal' | 'minimized';

export interface EditorMessage {
    to: string;
    cc: string; // string[]?
    bcc: string;
    subject: string;
    messageText: string;
}

export const makeEmptyMsg = function createEmptyEditorMessage(): EditorMessage {
  return {to: '', cc: '', bcc: '', subject: '', messageText: ''};
};

export const checkEmpty = function checkIfEditorMessageIsEmpty(message: EditorMessage) {
  return Object.values(message).every((field: string) => field === '');
};

export interface EditorData {
  msg: EditorMessage;
  size: editorSize;
}
