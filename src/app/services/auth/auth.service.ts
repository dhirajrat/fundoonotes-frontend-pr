import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  configUrl = "http://127.0.0.1:3000"
  registerUrl = "/register/"
  loginUrl = "/login/"
  errorMessage: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

}
