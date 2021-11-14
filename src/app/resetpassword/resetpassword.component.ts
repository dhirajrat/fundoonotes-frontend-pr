import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.value.password != this.resetForm.value.confirm) {
      return alert("password didn't match");
    }
    if (this.resetForm.valid) {
      // Geting Value from Route Params
      const paramtoken: any = this.route.snapshot.paramMap.get('token');
      this.auth.reset(this.resetForm.value, paramtoken).subscribe(
        (data: any) => {
          this.toastr.success("Password Reset Successfully! login Now","Success");
          this.router.navigate(['login']);
        },
        (error) => {
          this.toastr.error("Error in Reset","Failed");
        }
      );
    }
  }

  get f() {
    return this.resetForm.controls;
  }
}
