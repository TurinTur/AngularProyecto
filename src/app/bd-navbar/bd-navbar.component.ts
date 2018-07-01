import { Observable } from 'rxjs';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'app-bd-navbar',
  templateUrl: './bd-navbar.component.html',
  styleUrls: ['./bd-navbar.component.css']
})
export class BdNavbarComponent implements OnInit {

  appUser : AppUser;
  cart$: Observable<ShoppingCart>;

  // auth incluye tambien el objeto user. funciona con private en test, pero en la compilación de prod necesita que cualquier cosa usada en el template sea público
  // cambiado a private posteriormente porque he dejado de usarla directamente en el template
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
     auth.appUser$.subscribe(appUser => this.appUser = appUser);  // no necesitamos desuscribirnos onDestroy porque solo voy a tener una instancia de este componente en el Dom, y quiero que permanezca durante la vida de mi app


    }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();   // En cuanto haya un cambio en el shopping Cart, la subscripción se activará y reflejará el cambio
    
  }

  logout() {
    //console.log("clickeo logout");
    this.auth.logout();
  }
}
