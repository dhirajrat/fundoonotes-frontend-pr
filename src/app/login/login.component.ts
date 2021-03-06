import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  logoImage = 'assets/images/FundooNotes.png';
  errorMessage: string | undefined;

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.toastr.success('Login Successful', 'Success');
          console.log('token created while login', data.token);
          localStorage.setItem('currentUser', data.token);
          this.router.navigate(['notes']);
        },
        (error) => {
          if (error.status == 400) {
            this.toastr.error('Login Failed', 'Failed');
          }
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
