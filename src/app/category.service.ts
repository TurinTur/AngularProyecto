import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories () {
    return this.db.list('/categories',
      ref => ref.orderByChild('name')     // Ordenamos por nombre, ver https://github.com/angular/angularfire2/blob/master/docs/rtdb/querying-lists.md
    ).valueChanges();
  }


}
