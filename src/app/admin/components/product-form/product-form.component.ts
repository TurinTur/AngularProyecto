import { Product, ProductKey } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
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
  productTipo : ProductKey = {data: {title:'',price:0,category:'',imageUrl:''}, key:''};
  // no hace falta private para categoryService porque solo lo uso en el constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
            categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();
    this.id= this.route.snapshot.paramMap.get('id');
    if (this.id){
      //this.productService.get(id).subscribe(p => this.product = p);
    /*    this.productService.get(this.id)
         .pipe(take(1))                          // Con take, puedo coger un elemento y se desuscribirá solo. en verdad lo uso aqui para la desuscripción
         .subscribe(p => {
           this.product = p;
         }); */

         this.productService.getTipo(this.id).valueChanges() // Versión tipada, la he hecho para poder usar producto.prop. Tambien podria haber llamado a las propiedades con product['prop'] en vez de product.prop
        .pipe(take(1))
        .subscribe( p => {
          this.productTipo.data = p;
          
        });
    }

  }

  ngOnInit() {
  }

  save(product) {

    if (this.id) {
      console.log(product.category);
      this.productService.update(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    //console.log(product)
    this.router.navigate(['/admin/products']);
  }

  delete(){

    if (confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
