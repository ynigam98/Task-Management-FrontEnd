import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {  Response } from "@angular/http";
import {Observable} from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'https://localhost:44340';

  constructor(private http: HttpClient ) { }

  registerUser(user: User): Observable<User> {
    const body: User = {
      Email: user.Email,
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword
    };
    const httpOptions = { headers: new HttpHeaders ({'Content-Type': 'application/json', 'No-Auth': 'True'})};
    return this.http.post<User>(this.rootUrl + '/api/Account/Register', body, httpOptions);
  }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
}
