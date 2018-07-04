
//core
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
//third party
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from '@mindsorg/ng-data-table';          // Data table en admin products
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//componentes
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule, 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot()
  ],
  declarations: [    
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule.forRoot().ngModule
  ],
 
})
export class SharedModule { }
