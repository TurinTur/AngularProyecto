import { Product, ProductKey } from "./product";
import { ObjectToUniqueKey } from '@firebase/database/dist/src/core/util/util';

export class ShoppingCartItem
{
                        // Tengo datos por duplicado en este objeto
  title: string;        // las propiedades existen para que coincida el modelo con el modelo de la BD
  imageUrl: string;
  price: number;
  key: string;
  quantity: number;

  product: ProductKey;    // Adicionalmente tengo un productKey para poder actualizar el carrito con las acciones, ya que espero un ProductKey real con data y key
 
  constructor(init?: Partial<ShoppingCartItem>)  {// parametro opcional, que tiene objeto con una o mas propiedades de ShoppingCartItem
    Object.assign(this,init);
  }  

  //constructor(public product: ProductKey, public quantity: number){} 

  get totalPrice() {  
    return this.price * this.quantity;
  }
}
