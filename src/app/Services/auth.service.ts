import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { BearerToken } from '../classes/BearerToken';
import { Observable, throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean{
    const token = localStorage.getItem('accessToken');
    return token ? true : false;    
  }

  getUserRole() : string | null
  {
    const userRole = localStorage.getItem('userRole');

    if(userRole) return userRole;

  }

  login(credentials) : Observable<BearerToken> {

    return this.http.post<BearerToken>('https://localhost:44390/api/account/login',credentials);
     
  }

  register(credentials) {

    return this.http.post('https://localhost:44390/api/account/register',credentials);
     
  }

  isNameTaken(name:string) : Observable<any>{
        
    return this.http.post('https://localhost:44390/api/account/checkname',{'userName':name});

  }

  zeze(){
    return this.http.post('https://localhost:44390/api/Schedule/test',"zz zz");
  }

}
