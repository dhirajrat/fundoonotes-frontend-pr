import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ForgetPasswordPayload } from 'src/app/models/ForgetPasswordPayload';
import { LoginPayload } from 'src/app/models/LoginPayload';
import { ResetPasswordPayload } from 'src/app/models/ResetPasswordPayload';
import { SignupPayload } from 'src/app/models/SignupPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configUrl = 'http://localhost:8000';
  registerUrl = '/register/';
  loginUrl = '/login/';
  fpUrl = '/forgetpassword/';
  resetUrl = '/resetpassword';

  errorMessage: string | undefined;
  token = ""
  header = new HttpHeaders().set('token',this.getHeader())

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  getHeader(){
    if (this.currentUserValue != null){
      this.token = this.currentUserValue
    }
    return this.token
  }

  SignUp(signUpData: SignupPayload): Observable<any> {
    return this.http.post(this.configUrl + this.registerUrl, signUpData)
  }

  login(loginData: LoginPayload): Observable<any> {
    return this.http.post(this.configUrl + this.loginUrl, loginData)
  }

  forgetPassword(forgetData: ForgetPasswordPayload): Observable<any> {
    return this.http.post(this.configUrl + this.fpUrl, forgetData)
  }

  reset(resetData: ResetPasswordPayload, resettoken: any): Observable<any> {
    const resetheader = new HttpHeaders().set('token',resettoken)
    return this.http.post(this.configUrl + this.resetUrl, resetData, {
      headers: resetheader
    })
  }

  get currentUserValue(): string | null {
    return localStorage.getItem('currentUser');
  }
}
