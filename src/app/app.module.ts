// ANGULAR DEPENDENCY
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// ROUTNIG MODULE
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductActionComponent } from './product-action/product-action.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
