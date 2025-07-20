import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminHome } from './pages/admin-home/admin-home';
import { UserHome } from './pages/user-home/user-home';
import { Cart } from './pages/cart/cart';
import { ProductDetails } from './pages/product-details/product-details';
import { UpdateProduct } from './pages/update-product/update-product';
import { AddProduct } from './pages/add-product/add-product';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin-home', component: AdminHome },
  { path: 'user-home', component: UserHome },
  { path: 'cart', component: Cart },
  { path: 'product/:id', component: ProductDetails },
  { path: 'update-product/:id', component: UpdateProduct },
  { path: 'add-product', component: AddProduct }
];
