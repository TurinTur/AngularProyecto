import { CoreModule } from './core/core.module';
// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// añadidos
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
// 3rd party
import { AngularFireModule } from 'angularfire2';
// componentes
import { ProductsComponent } from './shopping/components/products/products.component';
// Servicios
import { UserService } from 'shared/services/user.service';                  // crud usuario DB
import { AuthService } from 'shared/services/auth.service';                  // logeo usuario
import { CategoryService } from 'shared/services/category.service';          // Obtiene las categorías de producto
import { ProductService } from 'shared/services/product.service';            // para salvar productos
import { ShoppingCartService } from 'shared/services/shopping-cart.service'; // shopping cart
import { OrderService } from 'shared/services/order.service';                // Orders;
import { AuthGuard } from 'shared/services/auth-guard.service';              // limita acceso a usuarios logeados
// Modulos
import { SharedModule } from './shared/shared.module';
import { AdminModule } from 'src/app/admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { LoginComponent } from './core/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,       // Módulo Core (login, home, bd-navbar)
    SharedModule,     // Modulo Shared
    AdminModule,      // Modulo Admin
    ShoppingModule,   // Modulo Shopping  
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([// el resto de routes están en los otros móduos, con .forChild, porque son hijos del app.Module
      { path: '', component: ProductsComponent},
      { path: 'login', component: LoginComponent }
    ])

  ],
  providers: [
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
