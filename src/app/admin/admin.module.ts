import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//Componentes
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
// Modules
import { SharedModule } from 'shared/shared.module';

// Servicios
import { AuthGuard } from 'shared/services/auth-guard.service';       // limita acceso a usuarios logeados
import { AdminAuthGuard } from './services/admin-auth-guard.service'; // limita acceso a paginas de admin

@NgModule({
  imports: [
    SharedModule,
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
