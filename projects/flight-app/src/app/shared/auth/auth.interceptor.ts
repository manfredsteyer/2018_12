import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, ObservableInput, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from 'selenium-webdriver/http';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private oauthStorage: OAuthStorage) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       
        if (req.url.startsWith('http://www.angular.at/api')) {
            const headers = req.headers.set('Authorization', 'Bearer ' + this.oauthStorage.getItem('access_token'));
            req = req.clone({headers});
        }
        return next.handle(req).pipe(
            catchError(resp => this.handleError(resp))
        );
    }

    handleError(resp: HttpErrorResponse): Observable<HttpEvent<any>> {
        if (resp.status === 401 || resp.status === 403) {
            // 401: Unauthorized
            // 403: Forbidden
            this.router.navigate(['/home', {needsLogin: true}]);
        }
        return throwError(resp);
    }

}