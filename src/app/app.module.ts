// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// añadidos
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// 3rd party
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from '@mindsorg/ng-data-table';
// componentes
import { BdNavbarComponent } from './bd-navbar/bd-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
// Servicios
import { AuthService } from './auth.service';                 // logeo usuario
import { AuthGuard } from './auth-guard.service';             // limita acceso a usuarios logeados
import { UserService } from './user.service';                 // crud usuario DB
import { AdminAuthGuard } from './admin-auth-guard.service';  // limita acceso a paginas de admin
import { CategoryService } from './category.service';         // Obtiene las categorías de producto
import { ProductService } from './product.service';           // para salvar productos



@NgModule({
  declarations: [
    AppComponent,
    BdNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    DataTableModule.forRoot(),
    NgbModule.forRoot(),
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate:[AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard] },   // de mas especifico
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate:[AuthGuard, AdminAuthGuard] },     // a menos especifico
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGuard,AdminAuthGuard] }
      
    ])

  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService, 
    CategoryService,
    ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
