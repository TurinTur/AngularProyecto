import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: any;
  productsKeys$: any;

  constructor(private ProductService: ProductService) { 
    this.products$ = this.ProductService.getAll();
    this.productsKeys$ = this.ObtenerKeys();
    console.log(this.productsKeys$);
  }

  ngOnInit() {
  }

  ObtenerKeys () {
    return this.ProductService.getAllSnapshot()
     .pipe(map(items => {            
       return items.map(a => {
         const data = a.payload.val();
         const key = a.payload.key;
         return {key, data};           // or {key, ...data} in case data is Obj
       });
    }));
  }
}
