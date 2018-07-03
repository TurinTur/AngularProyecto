
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
import { DataTableModule } from '@mindsorg/ng-data-table';          // Data table en admin products
// componentes
import { BdNavbarComponent } from './bd-navbar/bd-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component'
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component'
// Servicios
//import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';  // limita acceso a paginas de admin
import { UserService } from 'shared/services/user.service';                 // crud usuario DB
import { AuthService } from 'shared/services/auth.service';                 // logeo usuario
import { CategoryService } from 'shared/services/category.service';         // Obtiene las categorías de producto
import { ProductService } from 'shared/services/product.service';           // para salvar productos
import { ShoppingCartService } from 'shared/services/shopping-cart.service'; // shopping cart
import { OrderService } from 'shared/services/order.service';                // Orders;
import { AuthGuard } from 'shared/services/auth-guard.service';             // limita acceso a usuarios logeados
// Modulos
import { SharedModule } from './shared/shared.module';
import { AdminModule } from 'src/app/admin/admin.module';


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
    LoginComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,

  ],
  imports: [
    BrowserModule,
    SharedModule,     // Modulo Shared
    AdminModule,      
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    DataTableModule.forRoot(),
    NgbModule.forRoot(),
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent},
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard] },
      
    ])

  ],
  providers: [
    //AdminAuthGuard,
      AuthService,
      AuthGuard,
      UserService, 
      CategoryService,
      ProductService,
      ShoppingCartService,
      OrderService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
