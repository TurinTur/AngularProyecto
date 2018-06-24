import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product, ProductKey } from './models/product';
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

  private getCart(cartId: string){
    return this.db.object('shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(){                  // tiene que ser async porque uso await dentro, sin embargo ahora el método devolverá una promesa

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
    let item$ = this.db.object('shopping-carts/' + cartId + '/items/' + product.key).snapshotChanges();   // necesito obs de snapshot para .exists() y obetener valores

    item$
    .pipe(take(1))
    .subscribe( item => { 
       if (item.payload.exists()) {
         itemObject.update({quantity: item.payload.val()['quantity'] +1});  // el producto que intento insertar ya está ahi, asi que incremento la cantidad solamente
       } 
      else itemObject.set({ product: product.data, quantity:1});        // inserto el producto sin clave
   }); 


  }

}
