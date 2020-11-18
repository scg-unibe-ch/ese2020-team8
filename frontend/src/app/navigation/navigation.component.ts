import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { NotificationsService } from '../notifications.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  newNotificationCount: Observable<{ count: number }>;

  constructor(
    private router: Router,
    public userService: UserService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.newNotificationCount = this.notificationService.myNewNotifications;
  }

  goToLogin(): void {
    this.router.navigate(['user', 'login']);
  }
}
