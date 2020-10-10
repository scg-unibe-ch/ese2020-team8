import * as core from '@angular/core';
import {
  FormControl,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@core.Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements core.OnInit {
  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      passwordStrengthValidator,
    ]),
    passwordConfirm: new FormControl('', passwordRepeatValidator('password')),
  });

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const user = {
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('password').value,
    };

    if (this.registerForm.valid) {
      this.userService.register(user).subscribe((res) => {
        console.log(res);
        this.router.navigate(['user', 'login']);
      });
    }
  }
}

export function passwordRepeatValidator(fcSelector: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fc = control.parent?.controls[fcSelector] || null;
    return fc && fc.value !== control.value
      ? { passwordsDoNotMatch: {} }
      : null;
  };
}

const passwordStrengthValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const value: string = control.value || '';
  if (!value) {
    return null;
  }

  const upperCaseCharacters = /[A-Z]+/g;
  const lowerCaseCharacters = /[a-z]+/g;
  const numberCharacters = /[0-9]+/g;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (
    upperCaseCharacters.test(value) === false ||
    lowerCaseCharacters.test(value) === false ||
    numberCharacters.test(value) === false ||
    specialCharacters.test(value) === false
  ) {
    return {
      passwordStrength:
        'Password must contain at least two of the following: numbers, lowercase letters, uppercase letters, or special characters.',
    };
  }
};
