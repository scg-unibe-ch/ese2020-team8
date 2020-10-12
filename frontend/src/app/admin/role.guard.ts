import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.loggedIn || !this.userService.isAdmin) {
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }

}
