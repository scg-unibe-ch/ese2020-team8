import { Component, OnInit } from '@angular/core';
import { TransactionsService, ITransaction } from '../transactions.service';
import {IProductFilters} from '../pipes/product-filter.pipe';
import {IProduct} from '../products.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  transactions: ITransaction[];
  filters: IProductFilters = {};
  products: IProduct[];

  constructor(private transactionsService: TransactionsService) {
    this.reloadTransactions();
  }

  ngOnInit(): void {}

  reloadTransactions(): void {
    this.transactionsService.getMyTransactions().subscribe((trans) => {
      this.products = trans.map( t => t.Product );
    });
  }

  setPurchaseTypeFilter(status: string): void {
    this.filters = {
      purchaseType: status
    };
  }

  resetFilter(): void {
    this.filters = {};
  }
}
