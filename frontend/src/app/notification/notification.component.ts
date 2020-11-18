import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { INotification, NotificationsService } from '../notifications.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: INotification[] = [];

  constructor(
    public userService: UserService,
    public router: Router,
    private notificationService: NotificationsService
  ) {
    this.notificationService.getMyNotifications().subscribe(
      (notifications) =>
        (this.notifications = notifications.reverse().map((notification) => {
          const notificationCopy = {
            ...notification,
            panelOpenState: notification.status === 'new',
          };
          if (notification.status === 'new') {
            this.setNotificationSeen(notificationCopy);
          }
          return notificationCopy;
        }))
    );
  }

  private setNotificationSeen(notification: INotification): void {
    setTimeout(() => {
      this.notificationService
        .seenNotification(notification.id)
        .subscribe(() => (notification.status = 'seen'));
    }, 5000);
  }

  ngOnInit(): void {}
}
