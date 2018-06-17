import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';                  // Angularfire2 necesita un objeto de firebase, asi que todavia lo necesito importar
import { Observable,of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<firebase.User> // es mejor hacer un Observable de user que un user a secas, para luego sacarlo con async, asi no tengo que desuscribirme luego

  constructor(private afAuth: AngularFireAuth, 
              private route: ActivatedRoute, 
              private userService: UserService) {
    this.user$= afAuth.authState;
   }

  login (){
     const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // return url es definido en el método CanActivate de auth-guard
     localStorage.setItem('returnUrl',returnUrl); // redirigimos a esta url después del login
     console.log('url guardada en localStorage ' + returnUrl)
     //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());  // Hay varias formas de mostrar el logeo
     this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
     //this.afAuth.authState.subscribe(x => {console.log(x)})
  }

  logout (){
    this.afAuth.auth.signOut();
  }

/*   get appUser$_old () : Observable<AppUser> { // Es peligroso usar este valor en la UI directamente, porque usamos switchMap. Cuando el valor emitido cambia por el switchMap, la template se evalua de nuevo
    return this.user$.pipe(               // al detecar un cambio, haciendo que de nuevo se ejecute el get, de nuevo el switchMap... entra en bucle.
      switchMap(user => {   // cambiamos del observable(firebase.user) a observable(AngularFireObject<AppUser>) gracias al uid...
        return this.userService.get(user.uid).valueChanges(); // ...a Observable(AppUser) obtenido por valueChanges
      })
     );   
  } */

  get appUser$ () : Observable<AppUser> { // Cambiado porque a veces user.uid era null, cuando me intentaba deslogear, y rompia el programa
    return this.user$.pipe(               
      switchMap(user => {  
        if (user) return this.userService.get(user.uid).valueChanges() 

        return of(null); 
      })
    );   
  }
}
