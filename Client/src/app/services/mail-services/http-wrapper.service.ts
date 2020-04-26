import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  private readonly defaultHttpOptions = {
    headers : new HttpHeaders({ 'Content-type' : 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  get(url: string, options: HttpOptions = this.defaultHttpOptions): Observable<any> {
    return this.http.get(url, options);
  }

  post(url: string, body: any, options: HttpOptions = this.defaultHttpOptions): Observable<any> {
    return this.http.post(url, body, options);
  }
}
