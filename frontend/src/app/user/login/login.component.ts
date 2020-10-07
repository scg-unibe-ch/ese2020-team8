import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';

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

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login(): void {
    const user = {
      userName: this.userName,
      password: this.password,
    };
    this.userService.login(user).subscribe( () => this.router.navigate(['']));
  }

  logout(): void {
    this.userService.logout();
  }

  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.userService.accessSecuredEndpoint().subscribe(
      (res: any) => {
        this.secureEndpointResponse =
          'Successfully accessed secure endpoint. Message from server: ' +
          res.message;
      },
      (error: any) => {
        this.secureEndpointResponse = 'Unauthorized';
      }
    );
  }
}
