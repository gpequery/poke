import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LikeButtonComponent} from "./components/like-button/like-button.component";
import {PkmDataComponent} from "./components/pkm-data/pkm-data.component";

@NgModule({
  declarations: [
    AppComponent,
    LikeButtonComponent,
    PkmDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
