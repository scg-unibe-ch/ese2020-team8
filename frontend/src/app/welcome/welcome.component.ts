import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  secureEndpointResponse: string;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
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
