import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';                  // Angularfire2 necesita un objeto de firebase, asi que todavia lo necesito importar
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User> // es mejor hacer un Observable de user que un user a secas, para luego sacarlo con async, asi no tengo que desuscribirme luego

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$= afAuth.authState;
   }

  login (){
     const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // return url es definido en el método CanActivate de auth-guard
     localStorage.setItem('returnUrl',returnUrl); // redirigimos a este url después del login
     console.log('url guardada en localStorage ' + returnUrl)
     //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());  // Hay varias formas de mostrar el logeo
     this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
     //this.afAuth.authState.subscribe(x => {console.log(x)})
  }

  logout (){
    this.afAuth.auth.signOut();
  }
}
