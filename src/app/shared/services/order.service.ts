import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService: AuthService,private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order); //Estas dos lineas se deberían hacer en una transacción, y si una de las dos falla, ninguna de las dos debería ejecutarse.
    this.shoppingCartService.clearCart();
    
    return result;
  }

  getOrders (): Observable<{}[]> {
    return this.db.list('/orders').valueChanges();
  }

 getOrdersByUser (userId: string) {// : Observable<{}[]>{
      return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges()
      
  } 


}
