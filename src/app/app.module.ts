import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/common/login/login.component';
import { OrderComponent } from './component/orders/order/order.component';
import { HeaderComponent } from './component/common/header/header.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { ListOrderComponent } from './component/orders/list-order/list-order.component';
import { ListProductComponent } from './component/orders/list-product/list-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    ListOrderComponent,
    ListProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }