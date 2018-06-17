import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private auth: AuthService, router: Router, userService: UserService){  // no hace falta desuscribirnos de este .subscribe porque está en el componente raiz
    // Función: Cada vez que el usuario se logea (auth), salvamos el usuario en la BD (userService) y volvemos a una URL antigua (router)

    
    auth.user$.subscribe( user => {     // cada vez que el usuario logea o se deslogea, este observable emite un valor
      //console.log('emito valor !')

      if (user) {     // en el momento que se haga el logeo, tendremos el user (o nada, en es caso de logout)...
        userService.save(user);       // lo normal seria guardarlos cuando el usuario se registra, no siempre que entra
        //console.log('ha habido logeo')
        let returnUrl = localStorage.getItem('returnUrl');  // sacamos la url que guardamos justo antes del login
        router.navigateByUrl(returnUrl);                    // y volvemos allí
      }
    })
  }

}
