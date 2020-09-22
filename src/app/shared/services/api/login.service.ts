import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { AuthenticationService } from '../Auth';

const API_URL = END_POINTS.login;


export class UserLogin{
  username: string; 
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  login(user: UserLogin) {
    return this.http.post(API_URL, user).pipe(
      tap(
        (res: {token:string , role: string}) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);


        }
      )
    );
  }

}
