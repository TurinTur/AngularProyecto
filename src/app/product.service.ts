import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product, ProductKey } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll () {
    return this.db.list('/products').valueChanges();
  }

  getAllTipo () : Observable<Product[]>{                          // Como getAll pero tipada
    return this.db.list('/products').valueChanges().pipe(
      map(arrayP => { 
        return arrayP.map(producto => {
             const data: Product = {'title':producto['title'],    
                                   'price':producto['price'], 
                                   'category':producto['category'],
                                   'imageUrl':producto['imageUrl'],
           };
            return data;          
          });
      })
    );
  }

  getAllTipoKeys () : Observable<ProductKey[]>{                 // devuelvo los productos y sus claves
    return this.db.list('/products').snapshotChanges()
    .pipe(map(items => {            
      return items.map(a => {
        const data: Product = {'title':a.payload.val()['title'],     // forma antigua: const data = a.payload.val()
                               'price':a.payload.val()['price'], 
                               'category':a.payload.val()['category'],
                               'imageUrl':a.payload.val()['imageUrl'],
       };
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
   }));
  }


  getAllSnapshot () : Observable<AngularFireAction<DatabaseSnapshot<{}>>[]> {   // Develve el snapshot en vez del valueChanges
    return this.db.list('/products').snapshotChanges();
  }

  get(productId ) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  getTipo(productId ) : AngularFireObject<Product>{
    return this.db.object('/products/' + productId);
  }

  update (productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete (productId)
  {
   return this.db.object('/products/' + productId).remove();
  }
}
