import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { passwordRepeatValidator } from '../register/register.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  visible: boolean;

  userForm = this.fb.group({
    gender: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    zip: '',
    city: '',
    country: '',
    passwordConfirm: ['', passwordRepeatValidator('password')],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }

  setProfile() {
    // this.firstname.update(user);
  }

  onSubmit(): void {
    // this.userService.update(user).subscribe(() => {
    //   this.snackBar.open('Successfully updated your profile.');
    //   this.router.navigate(['user', 'profile']);
    // });
  }

  toggle() {
    this.visible = !this.visible;
  }
}
