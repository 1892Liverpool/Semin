import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenStorage} from './token.storage';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  TOKEN_API_URL = 'http://localhost:9090/token/generate-token';

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  static logOut() {
    TokenStorage.logOut();
  }

  static getToken(): string {
    return TokenStorage.getToken();
  }

  static getCurrentUser(): string {
    return TokenStorage.getCurrentUser();
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post<any>(this.TOKEN_API_URL, credentials);
  }

  isLoggedIn(): boolean {

    const token = AuthService.getToken();

    if (token == null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);

    /* console.log(
       this.jwtHelper.getTokenExpirationDate(token),
       this.jwtHelper.isTokenExpired(token)
     );*/
  }

  getDecodedToken(): any {
    return this.jwtHelper.decodeToken(AuthService.getToken());
  }

  getUserRole(): string {
    if (!this.isLoggedIn()) {
      return 'NONE';
    }
    const decodedToken = this.getDecodedToken();
    return decodedToken.role.authority;
  }

  getUserName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.sub;
  }

  isOperater(): boolean {
    return this.getUserRole() === 'ROLE_OPERATER';
  }

  isUser(): boolean {
    return this.getUserRole() === 'ROLE_USER';
  }

  isRequestManager(): boolean {
    return this.getUserRole() === 'ROLE_REQUEST_MANAGER';
  }

  isIncidentManager(): boolean {
    return this.getUserRole() === 'ROLE_INCIDENT_MANAGER';
  }
}

