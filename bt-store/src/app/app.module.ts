import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductionListComponent } from './products/product-list.component';
import { ReplaceStringWithStringPipe } from './shared/replace-string-with-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductionListComponent,
    ReplaceStringWithStringPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
