import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { DownLoaderComponent } from './downLoader/downLoader.component';
import { MessageComponent } from './message/message.component';
import { HerosComponent } from './heros/heros.component';
import { PackageSearchComponent } from './package-search/package-search.component';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
   declarations: [
      AppComponent,
      ConfigComponent,
      DownLoaderComponent,
      MessageComponent,
      HerosComponent,
      PackageSearchComponent,
      UploaderComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
         InMemoryDataService, { dataEncapsulation: false }
       )
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
// HttpClientInMemoryWebApiModule.forRoot(
//   InMemoryDataService, { dataEncapsulation: false }
// )
