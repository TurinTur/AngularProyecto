import { OrderService } from './../order.service';
import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {

  orders$: Observable<{}[]>;

  constructor(private authService: AuthService, private orderService: OrderService) { 
     this.orders$ = authService.user$.pipe(switchMap(u =>            // Switch, primero consigo el usuario, y luego uso el usario para obtener la orden
      
     orderService.getOrdersByUser(u.uid) )   
 
    );

  }

 
}
