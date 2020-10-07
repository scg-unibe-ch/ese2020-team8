import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  secureEndpointResponse: string;


  constructor(
    private router: Router,
    private userService: UserService
  ) {}


  // TodoList - READ
  ngOnInit(): void {
  }

  goToLogin(): void {
    this.router.navigate(['user', 'login']);
    // this.router.navigate(['/user/login']);
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
