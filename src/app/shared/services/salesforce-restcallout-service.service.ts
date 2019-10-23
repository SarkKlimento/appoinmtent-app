import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SalesforceRESTcalloutServiceService {

  readonly consumerKey: string;
  readonly authorizationEndpoint: string;
  readonly baseEndpoint: string;
  readonly redirect_uri: string;
  readonly httpOptions: object;
  readonly requestPayload: object;

  constructor(private http: HttpClient) {
    this.consumerKey = "3MVG91BJr_0ZDQ4ts4wXWZjdsbzB6Vc8qn0HIvu1sHodUXFw7oh2LgzRbr2zMZh_0nw_x0NomONhd1dJPbSFx";
    this.authorizationEndpoint = 'https://login.salesforce.com/services/oauth2/authorize';
    this.baseEndpoint = 'https://sark-klimento-dev-ed.lightning.force.com/services/apexrest/';
    this.redirect_uri = 'http://localhost:4200/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.requestPayload = {
      "response_type": "token",
      "client_id": this.consumerKey,
      "redirect_uri": this.redirect_uri
    };
  }

  sendRequestToSalesforce(endPoint: string, requestBody: any): Observable<Object> {
    return this.http.post<Object>(this.authorizationEndpoint, this.requestPayload, this.httpOptions).pipe();
  }
}
