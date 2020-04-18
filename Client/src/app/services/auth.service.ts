import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginData, RegisterData } from '../models/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly registerUrl = 'http://localhost:8000/register';
  private readonly loginUrl = 'http://localhost:8000/login';

  private readonly userDataSource: BehaviorSubject<User>;
  public readonly currentUserData: Observable<User>;

  httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userDataSource = new BehaviorSubject<User>(null);
    this.currentUserData = this.userDataSource.asObservable();
  }


  registerUser(user: RegisterData): Observable<object> {
    return this.http.post(this.registerUrl, {
      name: user.name,
      surname: user.surname,
      username: user.email,
      password: user.password
    }, this.httpOptions);
  }


  userLogin(user: LoginData): Observable<object> {
    const response = this.http.post(this.loginUrl, {
      username: user.email,
      password: user.password
    }, this.httpOptions);

    response.subscribe(
      (res: any) => {

        // TODO: get from res.
        const data = {name: 'Pera', surname: 'Peric', email: 'asd'};
        this.userDataSource.next(data);
      },
      (err: any) => {
        console.log(err);
      }
    );

    return response;
  }

  userLogout(): void {
    this.userDataSource.next(null);
  }

  loggedIn(): boolean {
    return !!this.userDataSource.getValue();
  }


}
