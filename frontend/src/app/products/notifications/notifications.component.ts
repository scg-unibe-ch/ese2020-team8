import { Component, OnInit } from '@angular/core';
import { notifications } from '../../notifications';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications = notifications;


  constructor() { }

  ngOnInit(): void {
  }

}
