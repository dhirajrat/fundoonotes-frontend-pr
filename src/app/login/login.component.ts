import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';   //i

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [    //i
    Validators.required,
    Validators.email,
  ]);

}
