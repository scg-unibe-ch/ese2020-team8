import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    //passWord: new FormControl(''),
    //eMail: new FormControl('')
  });

  //this is the method that will be called when submitting form 
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registrationForm.value);
  }
}