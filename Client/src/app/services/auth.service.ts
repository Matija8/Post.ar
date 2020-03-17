import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

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
    return this.http.post(this.registerUrl, {username : user.email, password : user.password }, this.httpOptions);
  }

  userLogin(user: User): any {
    return this.http.post(this.loginUrl, {username : user.email, password : user.password });
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }


}
