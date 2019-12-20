import { Injectable } from '@angular/core';
// HttpClient 会在 HttpErrorResponse 中捕获所有类型的错误信息
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  // 获取JOSN数据
  getConfig() {
    // return an Observable of Config
    return this.http.get<Config>(this.configUrl).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }
  // 读取响应头和响应体
  // HttpClient.get() 会返回一个 HttpResponse 类型的 Observable，而不只是 JSON 数据。
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.configUrl, { observe: 'response'});
  }

  // 错误处理函数
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
      // return an observable with a user-facing error message
      return throwError( 'Something bad happened; please try again later.' );
  }
}
