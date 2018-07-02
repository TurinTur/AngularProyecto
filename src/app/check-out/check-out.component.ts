
import { Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{

  //cartSubscription : Subscription;  // ya no me hace falta la subscripción, voy a unwrappear en el template y pasar el objeto a los form hijos
  //cart: ShoppingCart ;
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();                                   // con await me quito la promesa (nota: antes era una var local, ahora un field)
    //this.cartSubscription = cart$.subscribe(cart => this.cart=cart);                       // almaceno la subscripción para desuscribirme leugo
    
  }

  //ngOnDestroy(): void {
    //this.cartSubscription.unsubscribe();
  //}
  


}
