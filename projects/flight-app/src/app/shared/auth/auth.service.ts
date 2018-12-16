import { Injectable } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private oauthService: OAuthService) {

    }

    get userName() {
        const claims = this.oauthService.getIdentityClaims();
        if (claims) {
            return claims['given_name'];
            //                  ^^------ OIDC
        }
        return null;
    }


    login() {
        this.oauthService.initImplicitFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

}