import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

constructor(private http: HttpClient, private ms: MessageService) { }

getTextFile(filename: string) {
  return this.http.get(filename, { responseType: 'text'}).pipe(
    // tap操作符观察Observable传过来的正确值和错误值,可以做一些显示message的操作,比如调用log函数,不会修改这些值
    tap(
      data => this.log(filename, data),
      error => this.logError(filename, error)
    )
  );
}
private log(filename: string, data: string) {
  const message = `DownloaderService downloaded---${filename}and got--${data}`;
  this.ms.add(message);
}

private logError(filename: string, error: any) {
  const message = `DownloaderService failed---${filename}and got--${error.message}`;
  this.ms.add(message);
}
}
