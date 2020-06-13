import { Message } from '../Messages';
import { TagData, makeTagData } from '../TagData/TagData';
import { TagDataSet } from '../TagData/TagDataSet';

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

  selectedChar(messagesList: Message[]): string {
    const numOfMsgItems = messagesList ? messagesList.length : 0;
    if (this.selected.size === 0) {
      return 'None';
    }
    if (this.selected.size >= numOfMsgItems) {
      return 'All';
    }
    return 'Some';
  }

  protected refreshSelectedSet(selected: TagDataSet, messages: Message[]): TagDataSet {
    // Returns new set with deleted ids removed.
    const newSelected = new TagDataSet();
    if (!selected) {
      return newSelected;
    }
    const tagDataItems = messages.map(message => makeTagData(message));
    for (const item of tagDataItems) {
      if (selected.has(item)) {
        newSelected.add(item);
      }
    }
    return newSelected;
  }

}
