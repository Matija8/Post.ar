
export type editorSize = 'normal' | 'minimized';

export interface EditorMessage {
    to: string;
    cc: string; // string[]?
    bcc: string;
    subject: string;
    messageText: string;
}

export interface EditorData {
  msg: EditorMessage;
  size: editorSize;
}
