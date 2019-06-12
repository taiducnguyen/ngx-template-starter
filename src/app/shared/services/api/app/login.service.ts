import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../../http/http.service';
import { ApiHelper } from 'app/shared/services/api-helper';
import { ApiUrl } from '../../api-url/api-url';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

export interface ILoginInterface {
  // onLogin(userLogin: UserLoginModel): Observable<ApiResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginInterface {
  constructor(private http: HttpService, private httpClient: HttpClient) {}

  // onLogin = (userLogin: UserLoginModel): Observable<ApiResponse> => {

  //     let headers: HttpHeaders = new HttpHeaders();
  //     headers.append("Authorization", "Basic " + btoa(userLogin.userName + ":" + userLogin.password));
  //     headers.append("Content-Type", "application/x-www-form-urlencoded");

  //     const params = new HttpParams().set('username', userLogin.userName).set('password', userLogin.password).set('grant_type', 'password');

  //     return this.httpClient.post(ApiUrl.Login, {}, { headers: headers, params }).pipe(
  //         map(ApiHelper.extractData),
  //         catchError(ApiHelper.onFail));
  // }
}
