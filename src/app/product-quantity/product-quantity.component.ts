import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductKey } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product : ProductKey;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart()
  {
    console.log(this.product)
    this.cartService.addToCart(this.product);  // añado un producto al carrito
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }


}
