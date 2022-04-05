import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ReplaceStringWithStringPipe } from '../shared/replace-string-with-string.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductAddEditComponent } from '../products/product-add-edit/product-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ReplaceStringWithStringPipe,
    ProductAddEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProductModule { }
