import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EditorData, makeEmptyEditorMsg } from 'src/app/models/Compose';

@Injectable({
  providedIn: 'root'
})
export class OpenComposeService {

  public addEditorEmitter = new Subject<EditorData>();

  constructor() {
  }

  public addEditor(newEditor: EditorData) {
    newEditor = newEditor || {msg: makeEmptyEditorMsg(), size: 'normal'};
    this.addEditorEmitter.next(newEditor);
  }
}
