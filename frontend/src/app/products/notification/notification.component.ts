import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { INotification, NotificationsService } from '../notifications.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: INotification[] = [];

  constructor(
    public userService: UserService,
    public router: Router,
    private notificationService: NotificationsService
  ) {
    this.notificationService.getMyNotifications().subscribe( notifications => this.notifications = notifications.reverse());
  }

  ngOnInit(): void {
  }

}


