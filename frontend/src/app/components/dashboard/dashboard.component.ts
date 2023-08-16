import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  dietDetails: any;
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
      this.auth.profile().subscribe({
        next:(res) => {
          // alert(res.message);
          this.userDetails = res.data.user;
          this.dietDetails = res.data.diet;
          // console.log('userDetails : ' + (res.data.user));
        },
        error: (err) => {
          // console.log("dashboard error : " + err);
          alert(err?.error.message)

        }
      });

      // const user = this.auth.getUserDetails().id;

      // this.auth.getDiet({user: user}).subscribe({
      //   next:(res) => {
      //     console.log("res : " + res)
      //     // alert(res.message);
      //     // this.userDetails = res.data;
      //     // console.log('userDetails : ' + (res.data.email));
      //   },
      //   error: (err) => {
      //     console.log("dashboard error : " + err);
      //     // alert(err?.error.message)

      //   }
      // });

  }
  
  
}
