import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';


  constructor(
    private router: Router
  ) {}


  // TodoList - READ
  ngOnInit(): void {
  }

  goToLogin(): void {
    debugger;
    this.router.navigate(['user', 'login']);
    // this.router.navigate(['/user/login']);
  }

}
