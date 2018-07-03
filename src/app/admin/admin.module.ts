import { SharedModule } from 'shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { DataTableModule } from '@mindsorg/ng-data-table';
import { RouterModule } from '@angular/router';

import { AuthGuard } from 'shared/services/auth-guard.service';       // limita acceso a usuarios logeados
import { AdminAuthGuard } from './services/admin-auth-guard.service'; // limita acceso a paginas de admin

@NgModule({
  imports: [
    CommonModule,FormsModule,SharedModule,DataTableModule.forRoot(),
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard] },   // de mas especifico
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard, AdminAuthGuard] },     // a menos especifico
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGuard,AdminAuthGuard] }
      
    ])
  ],
  exports: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  

})
export class AdminModule { }
