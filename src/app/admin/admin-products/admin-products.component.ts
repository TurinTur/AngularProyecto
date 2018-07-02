import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Product, ProductKey } from '../../models/product';
import { DataTableResource } from '@mindsorg/ng-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  //products$: any;   // Con el sistema de filtrado, tengo que tener los productos en un array, asi que dejo de usar un observable
  products: ProductKey[];   
  productsKeys$: any;
  subscription: Subscription;
  tableResource: DataTableResource<ProductKey>;
  items: ProductKey[] = [];
  itemCount: number;

  constructor(private ProductService: ProductService) { 
    //this.products$ = this.ProductService.getAll();              // forma original, no tiene keys
    //this.subscription =this.productsKeys$ = this.ObtenerKeys()  // forma antigua, usando mi propio método para conseguir keys
    //this.subscription = this.ProductService.getAll().subscribe(p =>  this.filteredProducts = this.products = p);   // forma nueva, no me vale porque pierdo las keys que tenia en productsKeys, yo no tengo p.$key
    
    this.subscription =this.productsKeys$ = this.ObtenerKeys().subscribe(p => {
       this.products = p;
       this.initializeTable(this.products);

    });          
    
    
  }

  private initializeTable (products: ProductKey[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset:0})  // obtiene los datos según un offset. offset = 0 para la primera pagina, 50 para la 2ª si queremos 50 por pagina, etc
     .then( items => {
       this.items= items;
    });
   this.tableResource.count()
     .then(count => { 
       this.itemCount = count;
    });
  }

  reloadItems (params){

    if (!this.tableResource) return;

    console.log(params)
    this.tableResource.query(params)  
    .then( items => this.items= items);
  }

  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ObtenerKeys () : Observable<ProductKey[]>{        // He tenido que refactorizar para que devuelva los tipos especificos, ya que si no, no podia asignarlos a mis props.
    return this.ProductService.getAllSnapshot()
     .pipe(map(items => {            
       return items.map(a => {
         const data: Product = {'title':a.payload.val()['title'],     // forma antigua: const data = a.payload.val()
                                'price':a.payload.val()['price'], 
                                'category':a.payload.val()['category'],
                                'imageUrl':a.payload.val()['imageUrl'],
        };
         const key = a.payload.key;
         return {key, data};           // or {key, ...data} in case data is Obj
       });
    }));
  }

  filter(query: string){
    //console.log(query);
    let filteredProducts = (query) ?   // Si hay query, aplicar el filtro
      this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) : this.products; // si no, coger el array inicial
    
    this.initializeTable(filteredProducts);
  }
}
