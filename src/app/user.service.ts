import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save (user: firebase.User){
    this.db.object('/users/' + user.uid).update({    // 'Tabla' o nodo users, entrada con el id unico de cada user
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string) : AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }
}
