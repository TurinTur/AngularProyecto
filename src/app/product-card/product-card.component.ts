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
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  addToCart()
  {
    this.cartService.addToCart(this.product);  // añado un producto al carrito
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity () {
    if (!this.shoppingCart) return 0;       // Nos salimos si todavía no hay shopping cart

    let item = this.shoppingCart.items[this.product.key]
    return item ? item.quantity : 0;        // Devolvemos la cantidad del shopping Cart item
  }
}
