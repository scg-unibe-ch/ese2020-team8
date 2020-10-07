import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName = '';
  password = '';

  userToken: string;
  loggedIn = false;
  userNotExists = false;

  secureEndpointResponse = '';
  loginErrorMessage: string;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    const user = {
      userName: this.userName,
      password: this.password,
    };
    this.userService.login(user).subscribe(
      () => this.router.navigate(['']),
      (err: HttpErrorResponse) => {
        if (err.status === 500) {
          this.loginErrorMessage = 'Username or password is incorrect';
        }
      }
    );
  }

  logout(): void {
    this.userService.logout();
  }
}
