import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface HttpOptions {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
      [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  public readonly UnauthorizedEmitter = new Subject<void>();

  private readonly defaultHttpOptions = {
    headers : new HttpHeaders({ 'Content-type' : 'application/json' }),
    withCredentials: true
  };

  private readonly errorInterceptor = catchError((err: any) => {
    try {
      const statusCode = err.error.statusCode;
      const unauthCodes = [1000, 1022];
      if (unauthCodes.includes(statusCode)) {
        // console.log('Unauthorized!');
        this.UnauthorizedEmitter.next();
      }
    } catch {}
    return throwError(err);
  });

  constructor(private http: HttpClient) {}

  get(url: string, options: HttpOptions = this.defaultHttpOptions): Observable<any> {
    return this.http.get(url, options).pipe(
      this.errorInterceptor
    );
  }

  post(url: string, body: any, options: HttpOptions = this.defaultHttpOptions): Observable<any> {
    return this.http.post(url, body, options).pipe(
      this.errorInterceptor
    );
  }
}
