import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { IProduct } from '../products.service';
import { FormBuilder } from '@angular/forms';
import {
  IProductFilters,
  ProductFilterPipe,
} from '../pipes/product-filter.pipe';

@Component({
  selector: 'app-products-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnChanges {
  title = 'Product Search / Filter';
  @Input() products: IProduct[];
  @Input() filters: IProductFilters;
  @Input() searchTerm: string;
  @Output() searchTermChange = new EventEmitter<string>();

  private NUM_OF_OPTIONS = 12;

  filterForm = this.fb.group({
    location: '',
    price: '',
    delivery: '',
    productType: '',
    purchaseType: '',
  });
  productOptions: ProductFilterOptions;
  filteredProducts: IProduct[];

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    private productFilter: ProductFilterPipe
  ) {}

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((values) => {
      Object.entries(values).forEach(([columnName, value]) => {
        if (value) {
          this.filters[columnName] = { value: value as string };
        } else {
          delete this.filters[columnName];
        }
      });
      this.updateOptionCounters();
    });
  }

  ngOnChanges(): void {
    this.setOptions();
  }

  private setOptions(): void {
    const options: { [key: string]: CountedOption[] | string[] } = {
      location: this.createOption((p) => p.location),
      productType: this.createOption((p) => p.productType),
      purchaseType: this.createOption((p) => p.purchaseType),
    };
    this.productOptions = options;
  }

  private createOption(
    accessorFn: (product: IProduct) => string
  ): CountedOption[] {
    // count Occurrences of values
    const occurenceCount = this.products.reduce((resultat, product) => {
      const value = accessorFn(product);
      const valueCounter = resultat.filter((el) => el.value === value)[0];
      if (valueCounter) {
        valueCounter.counter += 1;
      } else {
        resultat.push({
          value,
          counter: 1,
        });
      }
      return resultat;
    }, []);

    // sort by counter and select only the most frequent values
    const sliced = occurenceCount
      .sort((a, b) => b.counter - a.counter)
      .slice(0, this.NUM_OF_OPTIONS);

    return sliced;
  }

  private updateOptionCounters(): void {
    this.filteredProducts = this.productFilter.transform(
      this.products,
      this.filters
    );
    Object.entries(this.productOptions).forEach(([columnName, options]) =>
      this.updateOptionCounter(columnName, options)
    );
  }

  private updateOptionCounter(
    columnName: string,
    options: CountedOption[] | string[]
  ): void {
    options.forEach((option: CountedOption | string) => {
      if (typeof option !== 'string') {
        option.counter = this.filteredProducts.filter(
          (p) => p[columnName] === option.value
        ).length;
      }
    });
  }
}

interface CountedOption {
  value: string;
  counter: number;
}

interface ProductFilterOptions {
  [key: string]: CountedOption[] | string[];
}
