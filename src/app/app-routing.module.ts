import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductComponent } from './component/orders/list-product/list-product.component';
import { ListOrderComponent } from './component/orders/list-order/list-order.component';
import { LoginComponent } from './component/common/login/login.component';
import { OrderComponent } from './component/orders/order/order.component';

const routes: Routes = [
    { path: '', component: ListProductComponent},
    { path: 'login', component: LoginComponent },
    { path: 'order', component: OrderComponent },
    { path: 'listorder', component: ListOrderComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
