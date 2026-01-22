import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/pages/products/products.component';
import { OrdersComponent } from './features/orders/pages/orders/orders.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { guestGuard } from './features/auth/guards/guest.guard';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
];
