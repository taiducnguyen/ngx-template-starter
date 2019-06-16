import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../../http/http.service';
import { ApiHelper } from 'app/shared/services/api-helper';
import { ApiUrl } from '../../api-url/api-url';
import { UserContextModel } from '@app/shared/models/user/user.model';
import { ApiResponse } from '@app/shared/models/api-response/api-response';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

export interface ILoginInterface {
  onLogin(userContext: UserContextModel): Observable<ApiResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginInterface {
  constructor(private http: HttpService) {}

  onLogin(userContext: UserContextModel): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .set('username', userContext.username)
      .set('password', userContext.password)
      .set('grant_type', 'password');
    let body = params.toString();

    return this.http.HttpPostHeader(ApiUrl.Login, headers, body).pipe(
      map(ApiHelper.extractData),
      catchError(ApiHelper.onFail)
    );
  }
}
