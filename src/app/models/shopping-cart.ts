import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart
{
  itemsArray: ShoppingCartItem[] = [];  // lo utilizo para iterar facilmente en el template. inicializar a [] porque hace falta para el push

  //constructor(public items: ShoppingCartItem[]) {}    // public inicializa la propia con getter y setter. necesito el constructor porque ahora mapeo el objeto de FB a este objeto
  constructor(public items: { [productId: string]: ShoppingCartItem} ) { // cambiado para representar mejor que tengo un objeto con keys/value dentro. key productId, value ShoppingCartItem
    for (let productId in items){                 // items tiene que seguir llamándose items porque así es llamado en FB y ShoppingCart es usado en el tipado de db.object<ShoppingCart> en el servicio
      const item = items[productId]
      //this.itemsArray.push(items[productId]);
      this.itemsArray.push( new ShoppingCartItem(item.product, item.quantity) );    // para poder usar el get totalPrice que no existe en FB, tengo que crear yo el objeto ShopCartItem
    }
  } 

  get totalItemsCount(){
    let count=0;
    for (let productId in this.itemsArray)                // productId es la key de cada item en ell shoppingCart en Firebase
       count+= this.itemsArray[productId].quantity;

    return count;
  }
 
 /*  get productsIds() {            // Lo usé temporalmente para iterar en el template por items: ShoppingCartItem[], ya que ngFor no soporta for...in
    return Object.keys(this.items); // Object.keys devuelve todas las propiedades (en este caso, keys) de un objeto en un array
  } */

  get totalPrice() {  
    let sum =0;
    for (const productId in this.itemsArray) {
       sum += this.itemsArray[productId].totalPrice;
    }
    return sum;
  }

}