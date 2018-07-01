import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {


  shipping : { 
    name : String  , 
    addressLine1: String, 
    addressLine2: String, 
    city: String} = {name:'',addressLine1:'',addressLine2:'',city:''};   
  cart: ShoppingCart ;
  cartSubscription : Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private shoppingCartService: ShoppingCartService, 
    private orderService: OrderService,
    private AuthService: AuthService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();                                     // con await me quito la promesa
    this.cartSubscription = cart$.subscribe(cart => this.cart=cart);                          // almaceno la subscripción para desuscribirme leugo
    this.userSubscription = this.AuthService.user$.subscribe(user => this.userId = user.uid); // uid es el identificador de usuario único de FB
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  

  placeOrder() {    
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.itemsArray.map(i => {    // porque estoy usando un map en un array, el resultado va a ser un un array en FB, con elementos 0, 1, 2, etc
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice        // guardo el precio calculado, por facilidad
        }
      })
    }
    console.log(order)
    this.orderService.storeOrder(order);
  } 
}
