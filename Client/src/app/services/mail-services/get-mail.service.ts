import { Injectable } from '@angular/core';
import { SecretarService } from '../secretar/secretar.service';
import { Folder, SimpleFolder, AggregateFolder, MessageFolder, TrashFolder } from 'src/app/models/Folder';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Draft } from 'src/app/models/Draft';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  public folders: {
    inbox: MessageFolder,
    sent: MessageFolder,
    all: AggregateFolder,
    drafts: SimpleFolder<Draft>,
    trash: TrashFolder,
  };

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
  ) {
    const messageFolders = {
      inbox: new MessageFolder(this.http, this.secretar, 'http://localhost:8000/inbox', 1005),
      sent: new MessageFolder(this.http, this.secretar, 'http://localhost:8000/sent', 1009),
    };
    this.folders = {
      ...messageFolders,
      all: new AggregateFolder(Object.values(messageFolders)),
      drafts: new SimpleFolder<Draft>(this.http, this.secretar, 'http://localhost:8000/drafts', 1007),
      trash: new TrashFolder(this.http, this.secretar, 'http://localhost:8000/trashed'),
    };
  }

  public emptyFolders(): Observable<boolean> {
    return zip(
      ...Object.values(this.folders).map(folder => folder.emptyFolder())
    ).pipe(
      map(_ => true),
      take(1)
    );
  }

  public validFolder(folder: string): boolean {
    return ['inbox', 'sent', 'starred', 'trash'].includes(folder);
  }
}
