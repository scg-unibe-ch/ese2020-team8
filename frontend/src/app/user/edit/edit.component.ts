import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IRegister, RegisterComponent } from '../register/register.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements IRegister {

  gender: '';
  firstname: '';
  lastname: '';
  username: '';
  password: '';
  phone: '';
  street: '';
  zip: '';
  city: '';
  country: '';

  userForm = ({
    user: <IRegister>,
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.get().subscribe((user) => {
      this.username = user.userName;
      this.userForm.patchValue(user);
    });
  }

  setProfile() {
    this.firstname.update(user);
  }

  onSubmit(): void {
    this.userService.update(user).subscribe(() => {
      this.snackBar.open('Successfully updated your profile.');
      this.router.navigate(['user', 'profile']);
    });
  }
}
