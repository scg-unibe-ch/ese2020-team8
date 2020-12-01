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
    id: '',
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

  onSubmit(): void {
    const user = this.userForm.value;
      this.userService.update(user).subscribe((res) => {
        console.log(res);
        this.router.navigate(['user', 'login']);
      });
  }

  toggle() {
    this.visible = !this.visible;
  }
}
