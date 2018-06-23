import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
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

  getAllTipo () : Observable<Product[]>{
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

  getAllSnapshot () : Observable<AngularFireAction<DatabaseSnapshot<{}>>[]> {
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
