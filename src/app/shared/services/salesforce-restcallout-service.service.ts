import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SimpleCrypto} from 'simple-crypto-js';
import {CookieService} from 'ngx-cookie-service';

declare var $: any;

@Injectable()
export class SalesforceRESTcalloutServiceService {

  readonly consumerKey: string;
  readonly baseEndpoint: string;
  readonly redirect_uri: string;
  readonly proxyUrl: string;
  readonly tokensCookieName: string;

  private scopeParameters: Array<string> = ['full', 'refresh_token'];

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.consumerKey = '3MVG91BJr_0ZDQ4ts4wXWZjdsb6SUrhvlOJodd2MCjLiglKDaqpQrnEfOgMb8iluoTu8h8FknH7DB1ME1Hp7g';
    this.baseEndpoint = 'https://sark-klimento-dev-ed.my.salesforce.com/services/apexrest/';
    this.redirect_uri = 'https://sark-appointment-app.herokuapp.com';
    this.proxyUrl = 'https://sark-proxy.herokuapp.com/';
    this.tokensCookieName = 'tokens';
  }

  sendRequestToSalesforce(endPoint: string, requestBody: any, retrieveToken: boolean): Observable<Observable<Object>> {
    return new Observable<Observable<Object>>(observer => {
      let token = this.getToken();
      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        })
      };

      if (retrieveToken) {
        this.refreshTokens().subscribe(next => {
          token = this.getToken();
          httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + token,
              'Accept': 'application/json'
            })
          };
          observer.next(this.http.post<Object>(this.baseEndpoint + endPoint, requestBody, httpOptions).pipe());
        });
      } else {
        observer.next(this.http.post<Object>(this.baseEndpoint + endPoint, requestBody, httpOptions).pipe());
      }
    });
  }

  //Step-one - get code
  authorize(): void {
    (new Promise((resolve, reject) => {
      let loginWindowURL = 'https://login.salesforce.com/services/oauth2/authorize?client_id='
        + this.consumerKey +
        '&redirect_uri=' + this.redirect_uri
        + '&response_type=code&scope=' + this.scopeParameters.join('%20');
      window.open(loginWindowURL, '_self');

      resolve();
    })).then(() => console.log(window.URL));
  }

  //Step-two - get tokens
  getTokens(code: string): Observable<Object> {
    return new Observable(observer => {
      const tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token?client_id='
        + this.consumerKey +
        '&grant_type=authorization_code' +
        '&redirect_uri=' + this.redirect_uri +
        '&code=' + code;

      fetch(this.proxyUrl + tokenEndpoint)
        .then(blob => blob.json())
        .then(data => {
          const accessToken = data['access_token'];
          const refreshToken = data['refresh_token'];

          if (accessToken && refreshToken) {
            this.setTokensToCookie(accessToken, refreshToken);
          }

          observer.next(true);
        })
        .catch(e => {
          console.log(e);
          return e;
        });
      console.log('Call end ');
    });
  }

  //Optional step - refresh token by the use of refresh token
  refreshTokens(): Observable<Object> {
    const refreshToken = this.getRefreshToken();

    return new Observable(observer => {
      const tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token?client_id='
        + this.consumerKey +
        '&grant_type=refresh_token' +
        '&redirect_uri=' + this.redirect_uri +
        '&refresh_token=' + refreshToken;

      fetch(this.proxyUrl + tokenEndpoint)
        .then(blob => blob.json())
        .then(data => {
          const accessToken = data['access_token'];

          if (accessToken) {
            this.setTokensToCookie(accessToken);
          }

          observer.next(true);
        })
        .catch(e => {
          console.log(e);
          return e;
        });
      console.log('Call end ');
    });
  }

  getCodeFromURL(): string {
    const urlString = window.location.href;
    const startIndex = urlString.indexOf('code') + 5;

    return startIndex > 4 ? urlString.substring(startIndex) : null;
  }

  getToken(): string {
    const decryptedTokens = this.getTokensFromCookie();

    return decryptedTokens ? decryptedTokens['accessToken'] : null;
  }

  getRefreshToken(): string {
    const decryptedTokens = this.getTokensFromCookie();

    return decryptedTokens ? decryptedTokens['refreshToken'] : null;
  }

  setTokensToCookie(accessToken: string, refreshToken?: string): void {
    let actualRefreshToken = refreshToken;

    if (!actualRefreshToken) {
      actualRefreshToken = this.getRefreshToken();
    }

    const simpleCrypto = new SimpleCrypto(this.consumerKey);
    const tokensObject = {accessToken: accessToken, refreshToken: actualRefreshToken};
    const encryptedTokens = simpleCrypto.encrypt(tokensObject);

    console.log(encryptedTokens);

    this.cookieService.set(this.tokensCookieName, encryptedTokens);

    console.log(accessToken);
  }

  private getTokensFromCookie(): any {
    const simpleCrypto = new SimpleCrypto(this.consumerKey);
    const encryptedTokens = this.cookieService.get(this.tokensCookieName);
    
    return encryptedTokens ? simpleCrypto.decrypt(encryptedTokens, true) : null;
  }
}
