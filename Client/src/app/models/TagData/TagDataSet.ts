import { TagData, messageType } from './TagData';

export class TagDataSet {
  private types: Map<messageType, Set<string>>;

  constructor() {
    this.types = new Map<messageType, Set<string>>();
  }

  add(message: TagData) {
    let msgIdsSet = this.types.get(message.type);
    if (!msgIdsSet) {
      msgIdsSet = new Set<string>();
      this.types.set(message.type, msgIdsSet);
    }
    msgIdsSet.add(message.messageId);
  }

  has(message: TagData): boolean {
    const msgIdsSet = this.types.get(message.type);
    return !!msgIdsSet && msgIdsSet.has(message.messageId);
  }

  delete(message: TagData): boolean {
    const msgIdsSet = this.types.get(message.type);
    return !!msgIdsSet && msgIdsSet.delete(message.messageId);
  }

  clear(): void {
    this.types = new Map<messageType, Set<string>>();
  }

  get size(): number {
    let size = 0;
    const setsByType = this.types.values();
    for (const set of setsByType) {
      size += set.size;
    }
    return size;
  }

  values(): TagData[] {
    const tagData = [];
    const setsByType = this.types.entries();
    for (const [type, msgIdsSet] of setsByType) {
      for (const messageId of msgIdsSet.values()) {
        tagData.push({ type, messageId });
      }
    }
    return tagData;
  }
}
