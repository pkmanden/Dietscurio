import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard {

//   constructor(private auth: AuthService, private router: Router) {}

//   // canActivate(): boolean {
//   //   if(this.auth.isLoggedIn()) {
//   //     return true;
//   //   } else {
//   //     // this.toast.error({detail: "ERROR", summary: "Please login first!", duration: 5000});
//   //     alert("Please login first!");
//   //     this.router.navigate(['login']);
//   //     return false;
//   //   }
//   // }
  
// }

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn()) {
    return true;
  } else {
    // this.toast.error({detail: "ERROR", summary: "Please login first!", duration: 5000});
    // alert("Please login first!");
    router.navigate(['login']);
    return false;
  }
};