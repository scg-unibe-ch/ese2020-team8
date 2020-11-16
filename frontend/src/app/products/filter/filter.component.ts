import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {UserService} from 'src/app/user/user.service';
import {Router} from '@angular/router';
import {IProduct} from '../products.service';
import {FormBuilder} from '@angular/forms';
import {IProductFilters} from '../pipes/product-filter.pipe';
import * as _ from 'lodash';

@Component({
  selector: 'app-products-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges {

  title = 'Product Search / Filter';
  searchText = '';
  @Input() products: IProduct[];
  @Input() filters: IProductFilters;

  filterForm = this.fb.group({
    location: '',
    price: '',
    delivery: '',
    productType: '',
    purchaseType: '',
    searchTerm: ''
  });
  productOptions: {[key: string]: string[];};

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe( values => {
      Object.entries(values).forEach( ([columnName, value]) => {
        if (value) {
          this.filters[columnName] = { value: value as string};
        }
      });
    });
  }

  ngOnChanges(): void {
    const options: {[key: string]: string[]} = {};

    options.purchaseType = this.products.map( p => p.purchaseType).filter((x, i, a) => a.indexOf(x) === i);
    options.productType = this.products.map( p => p.productType).filter((x, i, a) => a.indexOf(x) === i);

    this.productOptions = options;
  }
}
