import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductActionComponent } from './product-action/product-action.component';

const routes: Routes = [
  { path: '', redirectTo: 'productList', pathMatch: 'full' },
  { path: 'productList', component: ProductListComponent },
  { path: 'product-add', component: ProductActionComponent },
  { path: 'product-edit/:id', component: ProductActionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
