import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditorMessage } from '../../models/Compose';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  private readonly SEND_URL = 'http://localhost:8000/send';
  private readonly httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  send(message: EditorMessage) {
    this.http.post(this.SEND_URL, {
      recipient: message.to,
      subject: message.subject,
      content: message.messageText
    }, this.httpOptions).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
