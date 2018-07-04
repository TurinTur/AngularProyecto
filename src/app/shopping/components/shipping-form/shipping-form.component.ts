import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

  @Input('cart') cart: ShoppingCart;
  
  shipping : { 
    name : String  , 
    addressLine1: String, 
    addressLine2: String, 
    city: String
  } = {name:'',addressLine1:'',addressLine2:'',city:''};   

  userId: string;
  userSubscription: Subscription;

  constructor( 
    private orderService: OrderService,
    private AuthService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.AuthService.user$.subscribe(user => this.userId = user.uid); // uid es el identificador de usuario único de FB
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {    
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
   
    this.router.navigate(['/order-success', result.key])  //key, no $key. key es devuelto cuando algo es almacenado en FB.
  } 

}
