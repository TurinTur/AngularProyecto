import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';                  // Angularfire2 necesita un objeto de firebase, asi que todavia lo necesito importar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { 
    //afAuth.authState.subscribe(x => {console.log(x)})
  }

  ngOnInit() {
  }

  login() {
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()); 
    //this.afAuth.authState.subscribe(x => {console.log(x)})
  }

}
