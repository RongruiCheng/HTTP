import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showConfig = false;
  showDownloader = false;
  showHeroes = false;
  showSearch = false;
  showUploader = false;

  toggerConfig(): void {
    this.showConfig = !this.showConfig;
  }
  toggerDownloader(): void {
    this.showDownloader = !this.showDownloader;
  }
  toggerHeroes(): void {
    this.showHeroes = !this.showHeroes;
  }
  toggerSearch(): void {
    this.showSearch = !this.showSearch;
  }
  toggerUploader(): void {
    this.showUploader = !this.showUploader;
  }
}
