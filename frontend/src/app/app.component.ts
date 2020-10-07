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

}
