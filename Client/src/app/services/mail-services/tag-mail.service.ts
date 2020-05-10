import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
  ) {}

  star(messageId: string, value: boolean, type: string): Observable<any> {
    const response = value ? this.http.post('http://localhost:8000/starMessage', {messageId, type})
      : this.http.post('http://localhost:8000/removeStarredMessage', {messageId, type});
    response.subscribe(
      (res: any): void => {
        // console.log(res);
      },
      (err: any): void => {
        console.log(err);
      }
    );
    return response;
  }

}
