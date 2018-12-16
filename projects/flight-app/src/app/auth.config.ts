import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
 
  // Wo melden wir uns an?
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

  // Wer sind wir?
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa-demo',
  
   

  // Was wollen wir?
  scope: 'openid profile email voucher',
  //          Identity        | Access
  //          ID_Token        | Access_Token   <-- primär
  //          OIDC            | User-defined
}