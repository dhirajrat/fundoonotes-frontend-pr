import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  logoImage = 'assets/images/FundooNotes.png';
  submitted = false;
  hide = true;

  resetForm = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.value.password != this.resetForm.value.confirm) {
      return alert("password didn't match");
    }
    if (this.resetForm.valid) {
      // Geting Value from Route Params
      const paramtoken = this.route.snapshot.paramMap.get('token');
      console.log("respass component onsubmit 46 token: ",paramtoken)
      // this.resetForm.value.token = this.paramtoken;
      this.auth.reset(this.resetForm.value, paramtoken);
    }
  }

  get f() {
    return this.resetForm.controls;
  }
}
