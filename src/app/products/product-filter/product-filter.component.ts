import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category: string;  // category se define y usa en products, porque los productos se filtran por categoria, aqui es un parámetro de entrada

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll();
    
  }

  ngOnInit() {
  }

}
