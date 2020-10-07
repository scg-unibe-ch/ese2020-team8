import * as core from '@angular/core';
import {
  FormControl,
  ValidatorFn,
  AbstractControl,
  FormGroup,
  ValidationErrors,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

@core.Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements core.OnInit {
  registerForm = new FormGroup(
    {
      userName: new FormControl(''),
      password: new FormControl(''),
      // passwordConfirm: new FormControl(''),
      passwordConfirm: new FormControl('', passwordRepeatValidatorOld('password')),
    },
    // {
    //   validators: passwordRepeatValidator,
    // }
  );

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const user = {
      userName: this.registerForm.get('userName').value,
      password: this.registerForm.get('password').value,
    };
    debugger;

    if (this.registerForm.valid) {
      this.userService.register(user).subscribe((res) => {
        console.log(res);
        this.router.navigate(['user', 'login']);
      });
    }
  }
}

export function passwordRepeatValidatorOld(fcSelector: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fc = control.parent?.controls[fcSelector] || null;
    return fc && fc.value !== control.value ? { passwordsDoNotMatch: {} } : null;
  };
}
// export const passwordRepeatValidator: ValidatorFn = (
//   control: FormGroup
// ): ValidationErrors | null => {
//   const pw = control.get('password');
//   const pw2 = control.get('passwordConfirm');
//   return pw &&
//     pw2 &&
//     (pw.dirty || pw.touched) &&
//     (pw2.dirty || pw2.touched) &&
//     pw.value !== pw2.value
//     ? { passwordsDoNotMatch: true }
//     : null;
// };
//
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//     const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
//
//     return (invalidCtrl || invalidParent);
//   }
// }
