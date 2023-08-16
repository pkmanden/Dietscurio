import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  isSelected = true;
  registerForm!: FormGroup;  
  genders = ["Male", "Female", "Others"];



  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        gender: ['', Validators.required],
      })
  }

  showPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit() {
    if(this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.auth.register(this.registerForm.value)
      .subscribe({
        next:(res) => {
          alert(res.message);
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err?.err.message)
        }
      });
    } else {
      validateForm.validateAllFormFields(this.registerForm);
      alert("Invalid!");

    }
  }

}
