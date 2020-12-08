import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-navigation-layout',
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.css'],
})
export class NavigationLayoutComponent implements OnInit {

  @Input() newNotificationCount: Observable<{ count: number}>;

  constructor(
    private router: Router,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
  }

  goToFavorites(): void {
    this.router.navigate(['user', 'favorites']);
  }

}
