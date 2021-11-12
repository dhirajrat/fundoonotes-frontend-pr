import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  imageSignUp = 'assets/images/fundooAccount.png';
  logoImage = 'assets/images/FundooNotes.png';
  submitted = false;
  hide = true;

  signupForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[0-9a-zA-Z]+([.,+,_,-]{1}[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[.]{1}[a-zA-Z]{2,3}([.]{1}[a-zA-Z]{2})?'
        ),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%^&-+@]).{8,}'
        ),
      ],
    ],
    confirm: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.value.password != this.signupForm.value.confirm) {
      return alert("password didn't match");
    }
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth.SignUp(this.signupForm.value).subscribe(
        (data) => {
          alert('User Registered Successfully. Verify mail to login');
          this.router.navigate(['login']);
        },
        (error) => {
          if (error.status == 409) {
            alert('User Already Exist with this Mail ID');
          }
        }
      );
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}
