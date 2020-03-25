import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginData } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8000/register';
  private loginUrl = 'http://localhost:8000/login';

  httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  registerUser(user: User): any {
    return this.http.post(this.registerUrl, {
      name: user.name,
      surname: user.surname,
      username: user.email,
      password: user.password
    }, this.httpOptions);
  }

  userLogin(user: LoginData): any {
    // TODO: get data from server
    return of({data: 'some-token-value'});
  }

  userLogout(): void {
    localStorage.removeItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }


}
