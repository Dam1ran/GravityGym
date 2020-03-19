import { Injectable } from "@angular/core";
import { AuthService } from '../Services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor{

    constructor(private auth: AuthService){}
  
    intercept(req: HttpRequest<any>,next : HttpHandler) : Observable<HttpEvent<any>>
    {
        let currentUser = this.auth.isLoggedIn;
        let token = localStorage.getItem('accessToken');

        if(currentUser && token !== undefined)
        {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            })
        }

        return next.handle(req);
    }

}

