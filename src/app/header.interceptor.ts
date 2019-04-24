import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('auth')) {
            return next.handle(req);

        }
        let token = localStorage.getItem('authToken');
        const clonedRequest = req.clone({ setHeaders: { 'auth': token } });

        console.log(clonedRequest)
        return next.handle(clonedRequest);
    }
}