import { EditorMessage } from './Compose';

export interface Draft {
  messageId: string;
  to: string;
  subject: string;
  body: string;
  timestamp?: string;
}

export const toEditorMessage = function DraftToEditorMessage(draft: Draft): EditorMessage {
  return {
    to: draft.to,
    subject: draft.subject,
    messageText: draft.body,
  };
};
