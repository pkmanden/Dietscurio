import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";


  login() {
    this.auth.login(this.user).subscribe(() => {
      this.router.navigateByUrl('/profile');
    })
  }

  showPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
