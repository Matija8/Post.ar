import { Injectable } from '@angular/core';
import { SecretarService } from '../secretar/secretar.service';
import { Folder } from 'src/app/models/Folder';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class GetMailService {

  private readonly FOLDER_URLS: {readonly [folderName: string]: string} = {
    INBOX: 'http://localhost:8000/inbox',
    SENT: 'http://localhost:8000/sent'
  };

  private readonly VALID_FOLDERS = ['inbox', 'sent', 'starred'];

  public folders: {readonly [folderName: string]: Folder} = {
    inbox: new Folder(this.http, this.secretar, this.FOLDER_URLS.INBOX),
    sent: new Folder(this.http, this.secretar, this.FOLDER_URLS.SENT),
  };


  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService
  ) {}


  validFolder(folder: string): boolean {
    return this.VALID_FOLDERS.includes(folder);
  }
}
