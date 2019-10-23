import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SalesforceRESTcalloutServiceService {

  readonly consumerKey: string;
  readonly clientSecret: string;
  readonly authorizationEndpoint: string;
  readonly baseEndpoint: string;
  readonly redirect_uri: string;
  readonly httpOptions: object;
  readonly requestPayload: object;

  constructor(private http: HttpClient) {
    this.consumerKey = "3MVG91BJr_0ZDQ4ts4wXWZjdsb6SUrhvlOJodd2MCjLiglKDaqpQrnEfOgMb8iluoTu8h8FknH7DB1ME1Hp7g";
    this.clientSecret = "FCDE3C6C3E628271D9D8C494CF5D7D5007659DBDF9135881ADC7980FFD0BC30A";
    this.authorizationEndpoint = 'https://login.salesforce.com/services/oauth2/token';
    this.baseEndpoint = 'https://sark-klimento-dev-ed.lightning.force.com/services/apexrest/';
    this.redirect_uri = 'https://sark-appointment-app.herokuapp.com/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.requestPayload = {
      "grant_type": "token",
      "client_id": this.consumerKey,
      "client_secret": this.clientSecret,
      "username": "sarkklimento@senla.eu",
      "password": "misha1410261ISJSVYn84obc8BEnpEr3Al5uF",
      "redirect_uri": this.redirect_uri
    };
  }

  sendRequestToSalesforce(endPoint: string, requestBody: any): Observable<Object> {
    return this.http.post<Object>(this.baseEndpoint + endPoint, requestBody, this.httpOptions).pipe();
  }

  sendAuthRequestToSalesforce(endPoint: string, requestBody: any): Observable<Object> {
    return this.http.post<Object>(this.authorizationEndpoint, this.requestPayload, this.httpOptions).pipe();
  }
}
