import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Query } from '@firebase/database';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order); //Estas dos lineas se deberían hacer en una transacción, y si una de las dos falla, ninguna de las dos debería ejecutarse.
    this.shoppingCartService.clearCart();
    
    return result;
  }

  getOrders () {
    return this.db.list('/orders').valueChanges();
  }

*  getOrdersByUser (userId: string){
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  } 


}
