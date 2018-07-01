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

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
  shipping = { name: String, addressLine1: String, addressLine2: String, city: String};   
  cart: ShoppingCart;
  Subscription: Subscription;

  placeOrder() {    
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.itemsArray.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
  }   

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.Subscription = cart$.subscribe(cart => this.cart=cart);
  }

}
