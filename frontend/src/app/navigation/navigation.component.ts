import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  goToLogin(): void {
    this.router.navigate(['user', 'login']);
  }

}
