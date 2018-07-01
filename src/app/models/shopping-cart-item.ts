import { Product, ProductKey } from "./product";

export class ShoppingCartItem
{

  title: string;
  imageUrl: string;
  price: number;
  key: string;
  quantity: number;
  product: ProductKey;
  
  //constructor(public product: ProductKey, public quantity: number){} 

  get totalPrice() {  
    return this.price * this.quantity;
  }
}
