import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ProductKey, ShoppingCartItem, ShoppingCart } from './models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create() {
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  //getCart(cartId: string)
  public async getCart(){
    let cartId= await this.getOrCreateCartId();   //quiero el objeto directamente, asi que me espero en vez de implementar algo asincrono
    return this.db.object<ShoppingCart>('shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId() : Promise<string> {                  // tiene que ser async porque uso await dentro, sin embargo ahora el método devolverá una promesa

    let cartId = localStorage.getItem('cartId');      // Cojo el shopping cart id del usuario en su navegador
    if (cartId)  return cartId;                       // Si no existe, se crea en la db y en local ahora

    let result = await this.create();                 // create es asincrono y devuelve una promesa (antes usataba .then() ), ahora espero a que termine
    //this.create().then( result => {
    localStorage.setItem('cartId', result.key);
    return result.key;              // devuelvo el cart de la db

  }

  async addToCart(product: ProductKey) {              // addToCart => getOrCreateCartId => create (o ls.get) => meto el producto en el carrito en la bd
    let cartId = await this.getOrCreateCartId();
    let itemObject = this.db.object('shopping-carts/' + cartId + '/items/' + product.key)                 // operaciones de escritura (update, set) sobre el objeto
    //let item$ = this.db.object('shopping-carts/' + cartId + '/items/' + product.key).snapshotChanges();   // necesito obs de snapshot para .exists() y obtener valores
    let item$ = this.getItem(cartId,product.key);


    item$
    .pipe(take(1))
    .subscribe( item => {
      // if (item.payload.exists())                       // Antes usaba snapshotChanges, ahora he cambiado a valueChanges usando !=null y tipado ShoppingCartItem
      // { itemObject.update({quantity: item.payload.val()['quantity'] +1}); }
      // else itemObject.set({ product: product.data, quantity:1});

      //if (item != null)
      // itemObject.update({quantity: item.quantity +1});  // el producto que intento insertar ya está ahi, asi que incremento la cantidad solamente
      //else itemObject.set({ product: product.data, quantity:1}); // inserto el producto sin clave

      itemObject.update({ product: product.data, quantity: (item) ? item.quantity+ 1 : 1}); // Refactor: asi no tengo que usar If

   });
  }

  private getItem (cartId: string, productId: string){
    //return this.db.object('shopping-carts/' + cartId + '/items/' + productId).snapshotChanges()
    return this.db.object<ShoppingCartItem>('shopping-carts/' + cartId + '/items/' + productId).valueChanges()
  }

}
