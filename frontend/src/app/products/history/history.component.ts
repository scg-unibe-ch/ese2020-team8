import { Component, OnInit } from '@angular/core';
import {TransactionsService, ITransaction} from '../transactions.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transactions: ITransaction[];

  constructor(
    private transactionsService: TransactionsService
  )  {
    this.reloadTransactions();
  }

  ngOnInit(): void {
  }

  reloadTransactions(): void {
    this.transactionsService.getMyTransactions().subscribe( prods => this.transactions = prods);
  }
}
