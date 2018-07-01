import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductKey } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('show-actions') showActions : boolean = true;
  @Input('product') product : ProductKey;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart()
  {
    this.cartService.addToCart(this.product);  // añado un producto al carrito
  }

  ngOnInit(): void {
    //console.log(this.shoppingCart)
    //console.log(this.product)
    //console.log(this.shoppingCart.getQuantity(this.product) )
  }
}
