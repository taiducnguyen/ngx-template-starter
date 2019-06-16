import { environment } from '@env/environment.prod';

export class ApiUrl {
  static BaseUrl = environment.serverUrl;
  // IP APi
  public static UserIPAddress = 'https://ipinfo.io/json';

  //--Login
  public static Login = ApiUrl.BaseUrl + 'token';
}
