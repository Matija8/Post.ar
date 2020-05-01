import { Injectable } from '@angular/core';
import { SecretarService } from '../secretar/secretar.service';
import { Folder, SimpleFolder, AggregateFolder } from 'src/app/models/Folder';
import { HttpWrapperService } from './http-wrapper.service';
import { SMessage, RMessage } from 'src/app/models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly VALID_FOLDERS = ['inbox', 'sent', 'starred'];

  public folders: {readonly [folderName: string]: Folder};


  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService
  ) {
    const simpleFolders = {
      inbox: new SimpleFolder<RMessage>(this.http, this.secretar, 'http://localhost:8000/inbox', 1005),
      sent: new SimpleFolder<SMessage>(this.http, this.secretar, 'http://localhost:8000/sent', 1009),
    };
    const aggregateFolders = {
      starred: new AggregateFolder(Object.values(simpleFolders), (msg => msg.isStarred)),
      all: new AggregateFolder(Object.values(simpleFolders), (_ => true)),
    };
    this.folders = {
      ...simpleFolders,
      ...aggregateFolders,
      drafts: new SimpleFolder<any>(this.http, this.secretar, 'http://localhost:8000/drafts', 1007),
    };
  }


  validFolder(folder: string): boolean {
    return this.VALID_FOLDERS.includes(folder);
  }
}
