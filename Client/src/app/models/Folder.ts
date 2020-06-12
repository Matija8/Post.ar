import { BehaviorSubject, Observable, combineLatest, zip } from 'rxjs';
import { skipWhile, map, take } from 'rxjs/operators';
import { Message } from './Messages';
import { SecretarService } from '../services/secretar/secretar.service';
import { HttpWrapperService } from '../services/mail-services/http-wrapper.service';

export abstract class Folder<T> {
  public readonly contents: Observable<T[]>;
  public abstract refreshFolder(): Observable<boolean>;
  public abstract emptyFolder(): Observable<boolean>;
  public abstract waitForActivation(): Observable<boolean>;
}


export class SimpleFolder<T> extends Folder<T> {
  protected readonly stream = new BehaviorSubject<T[]>(null);
  public readonly contents: Observable<T[]> = Object.freeze(this.stream.asObservable());

  constructor(
    protected http: HttpWrapperService,
    protected secretar: SecretarService,
    protected readonly GET_REQUEST_URL: string,
    protected readonly EMPTY_FOLDER_ERR_CODE: number
  ) {
    super();
  }

  public refreshFolder(): Observable<boolean> {
    this.http.get(this.GET_REQUEST_URL)
    .pipe(take(1))
    .subscribe(
      (res: any): void => {
        this.handleResponse(res);
      },
      (err: any) => {
        this.handleError(err);
      }
    );
    return this.stream.pipe(
      skipWhile(contents => contents !== null),
      take(1),
      map(contents => !!contents)
    );
  }

  protected handleResponse(res: any): void {
    const dataJSON = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    ).data.replace('/"', '"');
    const data = JSON.parse(dataJSON);
    this.stream.next(this.decryptContents(data));
  }

  protected decryptContents(encryptedArray: any[]): any[] {
    return encryptedArray.map(
      (encryptedMsg): any => {
        /* if (!(encryptedMsg instanceof Object) && !encryptedMsg.content ) {
          return encryptedMsg;
        } */
        try {
          const decryptedContentJSON = this.secretar.decryptMessage(encryptedMsg.content);
          // console.log('Content JSON:', decryptedContentJSON);
          const decryptedContent = JSON.parse(decryptedContentJSON);
          // console.log('Content:', decryptedContent);
          delete encryptedMsg.content;
          const decryptedMessage = {
            ...encryptedMsg,
            ...decryptedContent,
          };
          return decryptedMessage;
        } catch (error) {
          console.log('Json parse error: ', error);
          return encryptedMsg;
        }
      }
    );
  }

  protected handleError(err: any): void {
    if (err.error.statusCode === this.EMPTY_FOLDER_ERR_CODE) {
      this.stream.next([]);
    } else {
      console.log('SimpleFolder error: ', err);
      // this.stream.error(err);
    }
  }

  public emptyFolder(): Observable<boolean> {
    this.stream.next(null);
    return this.stream.pipe(
      skipWhile(data => data !== null),
      take(1),
      map(_ => true)
    );
  }

  public waitForActivation(): Observable<boolean> {
    if (this.stream.getValue() === null) {
      this.refreshFolder();
    }
    return this.stream.pipe(
      skipWhile(data => data === null),
      take(1),
      map(_ => true)
    );
  }

}


export class InboxFolder extends SimpleFolder<Message> {

  constructor(
    http: HttpWrapperService,
    secretar: SecretarService,
    GET_REQUEST_URL: string,
    EMPTY_FOLDER_ERR_CODE: number
  ) {
    super(http, secretar, GET_REQUEST_URL, EMPTY_FOLDER_ERR_CODE);
  }

  protected handleResponse(res: any): void {
    const data = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    );
    this.stream.next(this.decryptContents(data));
  }
}


export class TrashFolder extends SimpleFolder<Message> {

  constructor(
    http: HttpWrapperService,
    secretar: SecretarService,
    GET_REQUEST_URL: string,
  ) {
    super(http, secretar, GET_REQUEST_URL, null);
  }

  protected handleResponse(res: any): void {
    const data = this.secretar.decryptAndVerify(
      res.payload.data,
      res.payload.secret,
      res.payload.hash
    );
    if (!(data instanceof Object) || !(data.hasOwnProperty('inbox') && data.hasOwnProperty('sent'))) {
      console.log('Trash decrypt error. Data: ', data);
      return;
    }
    this.stream.next(this.decryptContents(data.inbox.concat(data.sent)));
  }

  protected handleError(err: any): void {
    console.log('Trash folder error: ', err);
    // this.stream.error(err);
  }
}


export class AggregateFolder<T> extends Folder<T> {

  public readonly contents: Observable<T[]>;

  constructor(private folders: SimpleFolder<T>[]) {
    super();
    this.contents = combineLatest(folders.map(folder => folder.contents))
    .pipe(
      // Flatten arrays:
      map(arrayOfContents => Array.prototype.concat.apply([], arrayOfContents)
      )
    );
  }

  public refreshFolder(): Observable<boolean> {
    return zip(
      ...this.folders.map(folder => folder.refreshFolder())
    ).pipe(
      map(refreshStatusArray => refreshStatusArray.every(status => status === true)),
      take(1)
    );
  }

  public emptyFolder(): Observable<boolean> {
    return zip(
      ...this.folders.map(folder => folder.emptyFolder())
    ).pipe(
      map(_ => true),
      take(1)
    );
  }

  public waitForActivation(): Observable<boolean> {
    return combineLatest(
      this.folders.map(folder => folder.waitForActivation())
    )
    .pipe(
      map(activationSignals => activationSignals.every(signal => !!signal)),
      take(1)
    );
  }
}


export class FilteredFolder<T> extends AggregateFolder<T> {

  public readonly contents: Observable<T[]>;

  constructor(folders: SimpleFolder<T>[], predicate: (item: T) => boolean) {
    super(folders);
    this.contents = this.contents.pipe(
      map(contents => contents.filter(predicate))
    );
  }

}
