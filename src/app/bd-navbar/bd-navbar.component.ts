import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bd-navbar',
  templateUrl: './bd-navbar.component.html',
  styleUrls: ['./bd-navbar.component.css']
})
export class BdNavbarComponent implements OnInit {


  constructor(public auth: AuthService) {  //auth incluye tambien el objeto user. funciona con private en test, pero en la compilación de prod necesita que cualquier cosa usada en el template sea público

  }

  ngOnInit() {
  }

  logout() {
    console.log("clickeo logout");
    this.auth.logout();
  }
}
