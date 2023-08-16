import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDietComponent } from './components/add-diet/add-diet.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Data1Component } from './components/data1/data1.component';
import { Data2Component } from './components/data2/data2.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'data1', component: Data1Component},
  {path: 'data2', component: Data2Component},
  {path: 'add-diet', component: AddDietComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
