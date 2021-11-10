import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {
  submitted = false;
  logoImage = 'assets/images/FundooNotes.png';

  forgetForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;

    if (this.forgetForm.valid) {
      console.log(this.forgetForm.value);
      this.auth.forgetPassword(this.forgetForm.value);
    }
  }

  get f() {
    return this.forgetForm.controls;
  }
}
