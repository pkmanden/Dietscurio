import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  isSelected = true;

  genders = ["Male", "Female", "Others"];
  user: TokenPayload = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    gender: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.user).subscribe((resultData: any) => {
      console.log("register result : " + resultData);
      this.router.navigateByUrl('/profile');
    });
  }

  showPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
