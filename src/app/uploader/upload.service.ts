import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient,
    private ms: MessageService
    ) { }

  // 监听上传进度事件
  upload(file: File) {
    if ( !file ) { return ; }

    // const req = new HttpRequest('POST', '/upload/file', file, { reportProgress: true });

    // return this.http.request(req).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap(message => this.showProgress(message)),
    //   last(), // return last (completed) message to caller
    //   catchError(this.handleError(file))
    // );

    // 另一种上传方式
    return this.http.post('/upload/file', file, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(file))
    );
  }

  /** Return distinct message for sent, upload progress, & response events */
  /** 通过map操作符--将返回结果转换为明确的消息 */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  //   Returns a function that handles Http upload failures.
  //   @param file - File object for file being uploaded
  //  When no `UploadInterceptor` and no server,you'll end up here in the error handler.

  private handleError(file: File) {
    const userMessage = `${file.name} upload failed.`;

    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message = (error.error instanceof Error) ?
        error.error.message :
       `server returned code ${error.status} with body "${error.error}"`;

      this.ms.add(`${userMessage} ${message}`);

      // Let app keep running but indicate failure.
      return of(userMessage);
    };
  }

  // 传给message组件
  private showProgress(message: string) {
    this.ms.add(message);
  }

}
