import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(private authService: AuthService, private orderService: OrderService,private db: AngularFireDatabase,) { 
     this.orders$ = authService.user$.pipe(switchMap(u =>            // Switch, primero consigo el usuario, y luego uso el usario para obtener la orden
        this.db.list('/orders', ref => 
          u ? ref.orderByChild('userId').equalTo(u.uid) : ref ).valueChanges() 
        )
        //orderService.getOrdersByUser(u.uid))   
    );

  }

  async ngOnInit() {
    /* this.authService.user$.subscribe(async x => {
      console.log(x.uid);
      this.orders$= await this.orderService.getOrdersByUser(x.uid);
 
    for (const iterator of this.orders$) {
      console.log(iterator);
    }
    }); */
   
  }

}
