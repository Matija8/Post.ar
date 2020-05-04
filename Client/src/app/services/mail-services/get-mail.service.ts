import { Injectable } from '@angular/core';
import { SecretarService } from '../secretar/secretar.service';
import { Folder, SimpleFolder, AggregateFolder, TrashFolder } from 'src/app/models/Folder';
import { HttpWrapperService } from './http-wrapper.service';
import { SMessage, RMessage } from 'src/app/models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  public folders: {readonly [folderName: string]: Folder};

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService
  ) {
    const simpleFolders = {
      inbox: new SimpleFolder<RMessage>(this.http, this.secretar, 'http://localhost:8000/inbox', 1005),
      sent: new SimpleFolder<SMessage>(this.http, this.secretar, 'http://localhost:8000/sent', 1009),
    };
    this.folders = {
      ...simpleFolders,
      all: new AggregateFolder(Object.values(simpleFolders)),
      drafts: new SimpleFolder<any>(this.http, this.secretar, 'http://localhost:8000/drafts', 1007),
      trash: new TrashFolder(this.http, this.secretar, 'http://localhost:8000/trashed'),
    };
  }


  validFolder(folder: string): boolean {
    return ['inbox', 'sent', 'starred', 'trash'].includes(folder);
  }
}
