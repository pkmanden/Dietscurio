import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:3000/api/";
  userDetails: any;

  constructor(private http: HttpClient, private router: Router) { }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}login`, loginObj);
  }
  logout() {
    localStorage.clear();
    // localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getUserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
    // return this.http.get<any>(`${this.baseUrl}profile`);
  }
  
  profile() {
    // console.log("this.getUserDetails() : " + this.getUserDetails().id)
    // const params = {
    //   id: this.getUserDetails().id
    // }
    let id = this.getUserDetails().id;
    
    // console.log("param : " + param);
    return this.http.get<any>(`${this.baseUrl}profile/${id}`);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // retrurn true if there is token
  }

  addDiet(dietObj: any) {
    return this.http.post<any>(`${this.baseUrl}diet/add/`, dietObj);
  }

  getDiet(user: any) {
    return this.http.get<any>(`${this.baseUrl}diet`, user);
  }
}
