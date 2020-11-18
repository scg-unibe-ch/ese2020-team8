import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../products.service';

@Pipe({
  name: 'productFilter',
  pure: false,
})
export class ProductFilterPipe implements PipeTransform {
  private assertions = {
    match: (value, compareValue) => value === compareValue,
    isBetween: (value, compareValue) => {
      return value >= compareValue.min && value <= compareValue.max
    }
  };

  transform(
    products: IProduct[],
    filters: IProductFilters|string[],
    filterType = 'match'
  ): IProduct[] {
    return products.filter((product) => {
      return Object.entries(filters).every(([columnName, filter]) => {
        return this.assertFilter(product, columnName, filter, filterType);
      });
    });
  }

  assertFilter(
    product: IProduct,
    columnName: string,
    filter: IProductFilter|string,
    defaultFilterType: string
  ): boolean {
    // filter is either specified on the filter
    const selectedFilterType = typeof filter === 'object' && this.assertions.hasOwnProperty(filter.type) ? filter.type : defaultFilterType;
    const compareValue = typeof filter === 'object' ? filter.value : filter;
    let filterFunction = this.assertions[selectedFilterType];
    if (!filterFunction) {
      console.error(
        `implementation of selected filter ${selectedFilterType} is missing`
      );
      filterFunction = this.assertions.match;
    }
    return filterFunction(product[columnName], compareValue);
  }
}

export interface IProductFilters {
  [columnName: string]: IProductFilter|string;
}

export interface IProductFilter {
  value: string;
  type?: string;
}
