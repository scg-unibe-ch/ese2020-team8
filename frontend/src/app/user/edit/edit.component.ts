import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { passwordRepeatValidator, passwordStrengthValidator } from '../register/register.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  userId: number;
  visible: boolean;

  userForm = this.fb.group({
    gender: '',
    firstName: [ '', [ Validators.required, Validators.minLength(3) ] ],
    lastName: [ '', [ Validators.required, Validators.minLength(3) ] ],
    userName: [ '', [ Validators.required, Validators.minLength(3) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(7), passwordStrengthValidator ] ],
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
    this.userService.getProfile().subscribe((userId) => {
      this.userForm.patchValue(userId);
    });
  }

  onSubmit(): void {
    const user = this.userForm.value;
    this.userService.update(user).subscribe(() => {
      this.snackBar.open(
        'Successfully updated your profile.'
      );
      this.router.navigate(['']);
    });
  }

  toggle() {
    this.visible = !this.visible;
  }
}
