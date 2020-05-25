import { EditorMessage } from './Compose';

export class Draft {
  messageId: string;
  to: string;
  subject: string;
  content: string;
  // timestamp: string;

  toEditorMessage(): EditorMessage {
    return {
      to: this.to,
      cc: '',
      bcc: '',
      subject: this.subject,
      messageText: this.content,
    };
  }
}
