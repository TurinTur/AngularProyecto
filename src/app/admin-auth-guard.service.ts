import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AngularFireObject } from 'angularfire2/database';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) {  }

  /* canActivate_old() : Observable<boolean> {   // versión vieja!
    return this.auth.user$.pipe(
      switchMap(user => {   // cambiamos del observable(firebase.user) a observable(AngularFireObject<AppUser>) gracias al uid...
        return this.userService.get(user.uid).valueChanges(); // ...a Observable(AppUser) obtenido por valueChanges
      }),
      map(AppUser => AppUser.isAdmin));   // finalmente mapeamos de AppUser a la propiedad boolean, obteniendo un Observable<boolean>
  }
 */

  canActivate() : Observable<boolean> {     // versión nueva, reuso cóidgo de authService, por eso es mas corta
    return this.auth.appUser$.pipe(
      map(AppUser => AppUser.isAdmin));   // finalmente mapeamos de AppUser a la propiedad boolean, obteniendo un Observable<boolean>
  }
}
