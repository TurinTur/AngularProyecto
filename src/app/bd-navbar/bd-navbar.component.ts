import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-bd-navbar',
  templateUrl: './bd-navbar.component.html',
  styleUrls: ['./bd-navbar.component.css']
})
export class BdNavbarComponent implements OnInit {

  user: firebase.User
  constructor(private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => this.user = user)
  }

  ngOnInit() {
  }

  logout() {
    console.log("clickeo logout");
    this.afAuth.auth.signOut();
    //this.afAuth.authState.subscribe(x => {console.log(x)})
  }
}
