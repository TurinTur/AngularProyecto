import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart
{

  constructor(public items: ShoppingCartItem[]) {}    // public inicializa la propia con getter y setter. necesito el constructor porque ahora mapeo el objeto de FB a este objeto

  get totalItemsCount(){
    let count=0;
    for (let productId in this.items)                // productId es la key de cada item en ell shoppingCart en Firebase
       count+= this.items[productId].quantity;

    return count;
  }
 
}
