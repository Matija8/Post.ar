import { Injectable } from '@angular/core';
import { SecretarService } from '../secretar/secretar.service';
import { SimpleFolder } from 'src/app/models/Folder';
import { HttpWrapperService } from './http-wrapper.service';
import { SMessage, RMessage } from 'src/app/models/Messages';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly FOLDER_URLS: {readonly [folderName: string]: string} = {
    INBOX: 'http://localhost:8000/inbox',
    SENT: 'http://localhost:8000/sent'
  };

  private readonly VALID_FOLDERS = ['inbox', 'sent', 'starred'];

  public folders: {readonly [folderName: string]: SimpleFolder<any>} = {
    inbox: new SimpleFolder<RMessage>(this.http, this.secretar, this.FOLDER_URLS.INBOX, 1005),
    sent: new SimpleFolder<SMessage>(this.http, this.secretar, this.FOLDER_URLS.SENT, 1009),
  };


  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService
  ) {}


  validFolder(folder: string): boolean {
    return this.VALID_FOLDERS.includes(folder);
  }
}
