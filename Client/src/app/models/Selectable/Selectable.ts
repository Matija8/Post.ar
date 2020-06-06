import { Message } from '../Messages';
import { TagData } from '../TagData/TagData';
import { TagDataSet } from '../TagData/TagDataSet';
import { Draft } from '../Draft';

type messageLike = Draft | Message;

export class Selectable {

  protected selected: TagDataSet;

  constructor() {}

  onSelect([message, add]: [TagData, boolean]): void {
    if (add) {
      this.selected.add(message);
    } else {
      this.selected.delete(message);
    }
  }

  selectedChar(messagesList: messageLike[]): string {
    const numOfMsgItems = messagesList ? messagesList.length : 0;
    if (this.selected.size === 0) {
      return 'None';
    }
    if (this.selected.size >= numOfMsgItems) {
      return 'All';
    }
    return 'Some';
  }

}
