import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ReplaceStringWithStringPipe } from '../shared/replace-string-with-string.pipe';
import { StarComponent } from '../shared/star.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ReplaceStringWithStringPipe,
    StarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
