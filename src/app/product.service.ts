import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Injectable } from '@angular/core';

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

  getAllSnapshot () : Observable<AngularFireAction<DatabaseSnapshot<{}>>[]> {
    return this.db.list('/products').snapshotChanges();
  }

  get(productId ){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update (productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete (productId)
  {
   return this.db.object('/products/' + productId).remove();
  }
}
