import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/pages/products/products.component';
import { OrdersComponent } from './features/orders/pages/orders/orders.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent }
];
