import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config: Config;
  error: any;
  headers: string[];
  constructor(private cs: ConfigService) { }

  ngOnInit() {
  }
  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }
  // 读取请求的内容
  showConfig() {
    this.cs.getConfig().subscribe(
      (data: Config) => this.config = { ...data },
      error => this.error = error
    );
  }
  // 读取请求的内容和响应头
  showConfigResponse() {
    this.cs.getConfigResponse().subscribe(
      res => {
        const keys = res.headers.keys();
        // 响应头
        this.headers = keys.map( key => {
          return `${key}: ${res.headers.get(key)}`;
        });
        // 响应体(内容)
        this.config = { ...res.body };
      },
      error => this.error = error
    );
  }
}
