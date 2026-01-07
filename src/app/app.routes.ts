import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }
];
