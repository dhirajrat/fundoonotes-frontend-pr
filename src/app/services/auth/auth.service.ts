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
  fpUrl = '/forgetPassword/';
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
    this.http.post(this.configUrl + this.loginUrl, loginData).subscribe(
      (data: any) => {
        localStorage.setItem('currentUser', data.data);
        this.router.navigate(['notes']);
      },
      (error) => {
        if (error.status == 400) {
          alert('Either Wrong Password Or Verify Email');
        }
        this.errorMessage = error.error.message;
      }
    );

    return this.errorMessage;
  }

  forgetPassword(forgetData: FormBuilder): string | undefined {
    this.http.post(this.configUrl + this.fpUrl, forgetData).subscribe(
      (data: any) => {
        alert('Reset Password Link Sent to Your Email');
        this.router.navigate(['login']);
      },
      (error) => {
        this.errorMessage = error.error.message;
        alert('There is an Error');
      }
    );

    return this.errorMessage;
  }

  get currentUserValue(): string | null {
    return localStorage.getItem('currentUser');
  }
}
