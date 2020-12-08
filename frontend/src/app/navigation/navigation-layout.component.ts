import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-layout',
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.css'],
})
export class NavigationLayoutComponent implements OnInit {

  @Input() notificationCount: number;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  goToFavorites(): void {
    this.router.navigate(['user', 'favorites']);
  }

}
