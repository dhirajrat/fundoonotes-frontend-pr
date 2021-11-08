import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configUrl = 'http://localhost:8000';
  registerUrl = '/register/';
  loginUrl = '/login/';
  errorMessage: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  SignUp(signUpData: FormBuilder) {
    console.log('auth ser input Data : ', signUpData);

    this.http.post(this.configUrl + this.registerUrl, signUpData).subscribe(
      (data) => {
        console.log('auth ser backend Data : ', data);
        alert('User Registered Successfully. Verify mail to login');
        this.router.navigate(['login']);
      },
      (error) => {
        if (error.status == 409) {
          alert('User Already Exist with this Mail ID');
        }
        console.log(error);
      }
    );
  }

  login(loginData: FormBuilder): string | undefined {
    console.log('auth ser 29: ', loginData);
    this.http.post(this.configUrl + this.loginUrl, loginData).subscribe(
      (data: any) => {
        console.log('31: ', data);
        localStorage.setItem('currentUser', data.data);
        this.router.navigate(['notes']);
      },
      (error) => {
        console.log('error in login auth ser: ', error, error.status);
        if (error.status == 400) {
          alert('Either Wrong Password Or Verify Email');
        }
        this.errorMessage = error.error.message;
      }
    );

    return this.errorMessage;
  }

  get currentUserValue(): string | null {
    return localStorage.getItem('currentUser');
  }
}
