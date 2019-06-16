import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../../http/http.service';
import { ApiHelper } from 'app/shared/services/api-helper';
import { ApiUrl } from '../../api-url/api-url';
import { UserContextModel } from '@app/shared/models/user/user.model';
import { ApiResponse } from '@app/shared/models/api-response/api-response';

export interface ILoginInterface {
  onLogin(userContext: UserContextModel): Observable<ApiResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginInterface {
  constructor(private http: HttpService) {}

  onLogin(userContext: UserContextModel): Observable<ApiResponse> {
    let body = JSON.stringify(userContext);
    return this.http.HttpPost(ApiUrl.Login, body, false).pipe(
      map(ApiHelper.extractData),
      catchError(ApiHelper.onFail)
    );
  }
}
