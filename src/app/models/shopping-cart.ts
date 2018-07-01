import { ShoppingCartItem } from "./shopping-cart-item";
import { ProductKey } from "./product";

export class ShoppingCart
{
  itemsArray: ShoppingCartItem[] = [];  // lo utilizo para iterar facilmente en el template. inicializar a [] porque hace falta para el push

  //constructor(public items: ShoppingCartItem[]) {}    // public inicializa la propia con getter y setter. necesito el constructor porque ahora mapeo el objeto de FB a este objeto
  constructor(public items: { [productId: string]: ShoppingCartItem} ) { // cambiado para representar mejor que tengo un objeto con keys/value dentro. key productId, value ShoppingCartItem
  //constructor(public items:  ShoppingCartItem[] ) { 
    this.items = items || {}; //{}}

    for (let productId in items){           // items tiene que seguir llamándose items porque así es llamado en FB y ShoppingCart es usado en el tipado de db.object<ShoppingCart> en el servicio
      const item = items[productId]           

      //this.itemsArray.push(items[productId]);
      //this.itemsArray.push( new ShoppingCartItem(item.product, item.quantity) );    // para poder usar el get totalPrice que no existe en FB, tengo que crear yo el objeto ShopCartItem

      //let sci = new ShoppingCartItem();     //  He cambiado el diseño de ShoppingCartItem, antes tenia un Product y una cantidad, ahora tiene los campos de product directamente

      //Object.assign(sci, item);       // Assign copia todas las propiedades del param2 al param1 (title, imageurl, price, etc)
      //sci.key = productId;
      
      const productKey =  {data: {title:item.title, category:'',imageUrl:item.imageUrl,price:item.price}, key: productId}  // ahora ShoppingCartItem tiene propiedades del producto como en la BD y un productKey para actualizar el carro 
      this.itemsArray.push( new ShoppingCartItem({...item, product: productKey, key:productId}));  //... operador spread, es como si incluyese cada subitem en la declaración de objeto (title:title, price:price, etc)
      //console.log("item en push : ")
      //console.log(item)
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
  
  getQuantity (product: ProductKey) { 
    //console.log("p en getQ " )
    //console.log(product )
    let item;
    if (product != null){
      item= this.items[product.key]
    }
    else
    {
      item=0;
    }
    return item ? item.quantity : 0;        // Devolvemos la cantidad del shopping Cart item
  }
}