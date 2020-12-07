import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {NotificationsService} from '../notifications.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  newNotificationCount: Observable<{ count: number }>;

  constructor(
    public userService: UserService,
    private notificationService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newNotificationCount = this.notificationService.myNewNotifications;
  }

  goToLogin(): void {
    this.router.navigate(['user', 'login']);
  }

}
