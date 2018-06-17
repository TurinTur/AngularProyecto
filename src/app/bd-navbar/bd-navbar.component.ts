import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bd-navbar',
  templateUrl: './bd-navbar.component.html',
  styleUrls: ['./bd-navbar.component.css']
})
export class BdNavbarComponent implements OnInit {

  appUser : AppUser;
  
  // auth incluye tambien el objeto user. funciona con private en test, pero en la compilación de prod necesita que cualquier cosa usada en el template sea público
  // cambiado a private posteriormente porque he dejado de usarla directamente en el template
  constructor(private auth: AuthService) {  
     auth.appUser$.subscribe(appUser => this.appUser = appUser);  // no necesitamos desuscribirnos onDestroy porque solo voy a tener una instancia de este componente en el Dom, y quiero que permanezca durante la vida de mi app
  }

  ngOnInit() {
  }

  logout() {
    console.log("clickeo logout");
    this.auth.logout();
  }
}
