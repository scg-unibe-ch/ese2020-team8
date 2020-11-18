import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { merge, interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-wallet-icon',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  coins: Observable<number>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.coins = merge(
      this.userService.walletInfo$,
      interval(5000).pipe(switchMap(() => this.userService.walletInfo$))
    );
  }
}
