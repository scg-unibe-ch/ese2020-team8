import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName = new FormControl('');
  password = new FormControl('');
  passwordConfirm = new FormControl('');

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user = {
      userName: this.userName.value,
      password: this.password.value,
    };

    this.userService.register(user).subscribe( res => {
      console.log(res);
    });
  }

}
