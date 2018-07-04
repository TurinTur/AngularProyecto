import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './components/login/login.component';
import { BdNavbarComponent } from './components/bd-navbar/bd-navbar.component';
import { HomeComponent } from './components/home/home.component';
// Modules
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    BdNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    BdNavbarComponent,
    
  ]
})
export class CoreModule { }
