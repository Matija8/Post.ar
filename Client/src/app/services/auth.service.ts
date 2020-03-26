import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginData } from '../models/User';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8000/register';
  private loginUrl = 'http://localhost:8000/login';

  private userDataSource: BehaviorSubject<User>;
  currentUserData: Observable<User>;

  httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.userDataSource = new BehaviorSubject<User>(null);
    const loggedInDataFromCookie = new User('Pera', 'Peric', 'pera@postar.com', 'TODO: Ovako necemo cuvati sifru, ovo je privremeno');
    this.userDataSource.next(loggedInDataFromCookie);
    this.currentUserData = this.userDataSource.asObservable();

  }

  registerUser(user: User): any {
    return this.http.post(this.registerUrl, {
      name: user.name,
      surname: user.surname,
      username: user.email,
      password: user.password
    }, this.httpOptions);
  }

  userLogin(user: LoginData): any {
    const loginDataFromServerOrCookie = { data:
      {
        token: 'some-token-value',
        user: {name: 'Pera', surname: 'Peric', email: 'pera@postar.com', password: 'Veoma sigurna sifra*789' },
      }
    };
    const data = loginDataFromServerOrCookie.data;

    localStorage.setItem('token', data.token);

    this.userDataSource.next(data.user);

    return of( data );
  }

  userLogout(): void {
    this.userDataSource.next(null);
    localStorage.removeItem('token');
  }

  loggedIn() {
    return !!this.userDataSource.getValue();
  }


}
