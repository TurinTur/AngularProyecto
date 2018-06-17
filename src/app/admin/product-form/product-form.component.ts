import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {}; // para evitar tener un error en la carga inicial, ahora que usamos 2-way binding, ya que al inicio será null
  id: string;
  
  // no hace falta private para categoryService porque solo lo uso en el constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
            categoryService: CategoryService,
    private productService: ProductService) { 

    this.categories$ = categoryService.getCategories();
    this.id= this.route.snapshot.paramMap.get('id');
    if (this.id){
      //this.productService.get(id).subscribe(p => this.product = p);
      this.productService.get(this.id)
        .pipe(take(1))                          // Con take, puedo coger un elemento y se desuscribirá solo. en verdad lo uso aqui para la desuscripción
        .subscribe(p => this.product = p);
    } 

  }

  ngOnInit() {
  }

  save(product) {

    if (this.id) {
      this.productService.update(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    console.log(product)
    this.router.navigate(['/admin/products']);
  }

  delete(){

    if (confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    } 
  }

}
