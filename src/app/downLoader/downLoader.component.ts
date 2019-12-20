import { Component, OnInit } from '@angular/core';
import { DownloaderService } from './downloader.service';

@Component({
  selector: 'app-downLoader',
  templateUrl: './downLoader.component.html',
  styleUrls: ['./downLoader.component.css']
})
export class DownLoaderComponent implements OnInit {
  contents: string;
  constructor(private ds: DownloaderService) { }

  ngOnInit() {
  }
  download() {
    this.ds.getTextFile('assets/textfile.txt').subscribe(result => this.contents = result);
  }
  clear() {
    this.contents = '';
  }
}
