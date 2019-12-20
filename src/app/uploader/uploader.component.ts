import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  message: string;
  constructor(private us: UploadService) { }

  ngOnInit() {
  }
  onPicked(input: HTMLInputElement) {
    // input.files 是一个类数组对象
    const file = input.files[0];
    this.us.upload(file).subscribe( msg => {
      input.value = null;
      this.message = msg;
    });
  }
}
