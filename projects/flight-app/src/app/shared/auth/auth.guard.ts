import { AuthService } from './auth.service';
import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authService: AuthService) {

    }

    canActivate(target, source) {
        if(this.authService.userName) {
            return true;
        }

        // this.router.navigate(['/home', {needsLogin: true}]);
        // return false;
        return this.router.createUrlTree(['/home', {needsLogin: true}]);
    }
}