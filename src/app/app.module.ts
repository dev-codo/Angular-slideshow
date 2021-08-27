import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { CustomButtonComponent } from './custom-button.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule],
  declarations: [AppComponent, SlidesComponent, CustomButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
