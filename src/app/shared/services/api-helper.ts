import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError, ApiResponse, ApiListResponse } from '../models/api-response/api-response';

export module ApiHelper {
  export function extractData(res: any | any): any {
    let body = res;
    return body;
  }

  export function onFail(err: HttpErrorResponse | any) {
    return throwError(<ApiError>err.error);
  }

  export function extractJsonData(res: ApiResponse): any {
    let body = res.content;
    return body;
  }

  export function extractJsonListData(res: ApiListResponse): any {
    let body = res.content;
    return body;
  }
}
