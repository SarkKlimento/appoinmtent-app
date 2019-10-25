import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

declare const $: any;

@Injectable()
export class SalesforceRESTcalloutServiceService {

  readonly consumerKey: string;
  readonly baseEndpoint: string;
  readonly redirect_uri: string;

  private scopeParameters: Array<string> = ['full', 'refresh_token'];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.consumerKey = "3MVG91BJr_0ZDQ4ts4wXWZjdsb6SUrhvlOJodd2MCjLiglKDaqpQrnEfOgMb8iluoTu8h8FknH7DB1ME1Hp7g";
    this.baseEndpoint = 'https://sark-klimento-dev-ed.my.salesforce.com/services/apexrest/';
    this.redirect_uri = 'https://sark-appointment-app.herokuapp.com/';
  }

  sendRequestToSalesforce(endPoint: string, requestBody: any, token: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };

    return this.http.post<Object>(this.baseEndpoint + endPoint, requestBody, httpOptions).pipe();
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
  getTokens(): Observable<Object> {
    return new Observable(observer => {
      const code = this.getCodeFromURL();
      const tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token?client_id='
        + this.consumerKey +
        '&grant_type=authorization_code' +
        '&redirect_uri=' + this.redirect_uri +
        '&code=' + code;
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };


      console.log(tokenEndpoint);
      /*const resf = new XMLHttpRequest();
      resf.open('POST', tokenEndpoint);
      resf.onload = e =>{
        console.log(resf.response);
      };
      resf.send('');*/
      $.post(tokenEndpoint, {
        headers: {Accept: "application/json", "Access-Control-Allow-Origin": "*"},
        crossOrigin: true,
      }, (data, status) => {
        console.log(data);
        console.log(status);
      });
      //fetch(tokenEndpoint, {method: 'POST', body: '', mode: 'no-cors'}).then(response => console.log(response.json()));
      /*this.http.post<Object>(tokenEndpoint, '', httpOptions).pipe().subscribe(next => {

        console.log(next);
        // TODO: send data to the cookie
        observer.next('Done');
        observer.complete();
      }, error => {
        console.log(error);
      });*/
    });
  }

  //Optional step - refresh token by the use of refresh token
  refreshTokens(): Observable<Object> {
    return new Observable(observer => {
      const refreshToken = this.getRefreshToken();
      const tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token?client_id='
        + this.consumerKey +
        '&grant_type=refresh_token' +
        '&redirect_uri=' + this.redirect_uri +
        '&refresh_token=' + refreshToken;

      this.http.post<Object>(tokenEndpoint, '').pipe().subscribe(next => {

        // TODO: send data to the cookie
        observer.next('Done');
        observer.complete();
      }, error => {
        console.log(error);
      });
    });
  }

  getCodeFromURL(): string {
    const urlString = window.location.href;
    const startIndex = urlString.indexOf('code') + 5;

    return startIndex > 4 ? urlString.substring(startIndex) : null;
  }

  getTokenFromURL(): string {
    const urlString = window.location.href;
    const startIndex = urlString.indexOf('#') + 14;
    const endIndex = urlString.indexOf('&', startIndex);

    return startIndex > 13 && endIndex > -1 ? urlString.substring(startIndex, endIndex) : null;
  }

  getRefreshToken(): string {
    const urlString = window.location.href;
    const startIndex = urlString.indexOf('#') + 14;
    const endIndex = urlString.indexOf('&', startIndex);

    return startIndex > 13 && endIndex > -1 ? urlString.substring(startIndex, endIndex) : null;
  }
}
