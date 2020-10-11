import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.userService.loggedIn || !this.userService.isAdmin) {
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }
}
