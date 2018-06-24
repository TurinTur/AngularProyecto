import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {

  products: Product[] = [];
  category: string ;
  filteredProducts: Product[];
  
  constructor(
    productService: ProductService, 
    route: ActivatedRoute) { 

    //this.products= productService.getAll(); // Comentado porque hemos pasado de products$ a products[]

/*     productService.getAllTipo().subscribe(products => {
      this.products= products ;

      route.queryParamMap.subscribe(params => {  
        this.category = params.get('category');   // Uso category para hacer highlight en el template

        this.filteredProducts = (this.category) ?
          this.products.filter(p=> p.category === this.category) : this.products;
      });
    }); */

    productService                  // Cambiado a switchMap por cuestión de estilo, para no tener dos subscribe anidados. En verdad es un poco tonto porque el segundo 
    .getAllTipo()                   // observable no viene del primero, devolvemos queryParam para subscribirnos a eso.
    .pipe(
      switchMap(products => {       
        this.products = products ;
        return route.queryParamMap;
       })
     )
      .subscribe(params => {  
        this.category = params.get('category');   // Uso category para hacer highlight en el template

        this.filteredProducts = (this.category) ?
          this.products.filter(p=> p.category === this.category) : this.products;
      });
    

    
  }




}
