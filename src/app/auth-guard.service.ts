import { Injectable } from '@angular/core';
import { CanActivate,  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state:RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(map(user => { // mapeamos del observable(firebase.user) a Observable<boolean>
      if (user) return true;
      // si no...
      this.router.navigate(['/login'],{ queryParams:{ returnUrl: state.url}}); // redirigir al la url actual después del login
      return false;
    }))

  }


}
