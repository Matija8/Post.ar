import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { GetMailService } from './get-mail.service';
import { Observable } from 'rxjs';
import { TagData } from 'src/app/models/TagData/TagData';

@Injectable({
  providedIn: 'root'
})
export class TagMailService {

  constructor(
    private http: HttpWrapperService,
    private getMail: GetMailService,
  ) {}

  star(messages: TagData[], value: boolean): Observable<any> {
    const response = value ? this.http.post('http://localhost:8000/starMessage', {messages})
      : this.http.post('http://localhost:8000/removeStarredMessage', {messages});
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
