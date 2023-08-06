import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Data1Component } from './data1/data1.component';
import { Data2Component } from './data2/data2.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'data1', component: Data1Component},
  {path: 'data2', component: Data2Component},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
