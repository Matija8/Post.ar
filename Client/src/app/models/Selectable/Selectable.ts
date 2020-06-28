import { Message } from '../Messages';
import { TagData, makeTagData } from '../TagData/TagData';
import { TagDataSet } from '../TagData/TagDataSet';


export type selectFilter = 'all' | 'none' | 'starred' | 'notStarred' | 'read' | 'notRead';


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

  public itemIsSelected(message: Message): boolean {
    return this.selected.has(makeTagData(message));
  }

  protected refreshSelectedSet(selected: TagDataSet, messages: Message[]): TagDataSet {
    const newSelected = new TagDataSet();
    if (!selected || !messages) {
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

  protected filterMessages(messages: Message[], filter: selectFilter): TagDataSet {
    const set = new TagDataSet();
    const addItemsToSet = (items: any[]) => items.forEach(item => set.add(makeTagData(item)));
    // Strategy pattern insetad of switch?
    switch (filter) {
      case 'all':
        addItemsToSet(messages);
        break;
      case 'none':
        // Don't add anything.
        break;
      case 'starred':
        addItemsToSet(messages.filter(item => item.isStarred));
        break;
      case 'notStarred':
        addItemsToSet(messages.filter(item => !item.isStarred));
        break;
      case 'read':
        addItemsToSet(messages.filter(item => item.isRead));
        break;
      case 'notRead':
        addItemsToSet(messages.filter(item => !item.isRead));
        break;
    }
    return set;
  }

}
