import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductKey } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {


  @Input('product') product : ProductKey;
  @Input('show-actions') showActions : boolean = true;

  constructor(private cartService: ShoppingCartService) { 
  }

  addToCart(product: ProductKey)
  {
    this.cartService.addToCart(product);  // añado un producto al carrito
   
  }
}
