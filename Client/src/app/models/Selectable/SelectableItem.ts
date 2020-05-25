import { Output, EventEmitter } from '@angular/core';
import { TagData } from '../TagData/TagData';

export class SelectableItem {

  @Output() protected selectEmitter = new EventEmitter<[TagData, boolean]>();
  public isSelected: boolean;

  selectToggle(message: TagData) {
    this.isSelected = !this.isSelected;
    this.selectEmitter.emit([message, this.isSelected]);
  }

}
