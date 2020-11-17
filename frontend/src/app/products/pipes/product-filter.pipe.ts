import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from '../products.service';

@Pipe({
  name: 'productFilter',
  pure: false
})
export class ProductFilterPipe implements PipeTransform {

  private assertions = {
    match: (value, compareValue) => value === compareValue.value
  };

  transform(products: IProduct[], filters: IProductFilters, filterType = 'match'): IProduct[] {
    return products.filter( product => {
      return Object.entries(filters).every( ([columnName, compareValue]) => {
        return this.assertFilter(product, columnName, compareValue, filterType);
      });
    });
  }

  assertFilter(product: IProduct, columnName: string, compareValue: IProductFilter, filterType: string): boolean {
    // filter is either specified on the filter
    const selectedFilterType = compareValue.type || filterType;
    let filterFunction = this.assertions[selectedFilterType];
    if (!filterFunction) {
      console.error(`implementation of selected filter ${selectedFilterType} is missing`);
      filterFunction = this.assertions.match;
    }
    return filterFunction(product[columnName], compareValue);
  }
}

export interface IProductFilters {
  [columnName: string]: IProductFilter;
}

export interface IProductFilter {
  value: string;
  type?: string;
}
