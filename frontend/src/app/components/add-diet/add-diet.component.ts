import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-diet',
  templateUrl: './add-diet.component.html',
  styleUrls: ['./add-diet.component.css']
})
export class AddDietComponent implements OnInit {

  dietForm!: FormGroup;  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {

    const user = this.auth.getUserDetails().id;

    this.dietForm = this.fb.group({
      date: ['', Validators.required],
      weight: ['', Validators.required],
      user: [user],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required],
      snacks: ['', Validators.required],
    })
  }   

  addDiet() {
    
    if(this.dietForm.valid) {
      console.log(this.dietForm.value);
      this.auth.addDiet(this.dietForm.value)
      .subscribe({
        next:(res) => {
          alert(res.message);
          this.dietForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          alert(err?.err.message)
        }
      });
    } else {
      validateForm.validateAllFormFields(this.dietForm);
      alert("Invalid!");

    }
  }

  clearForm() {
    this.dietForm.reset();
  }

}
