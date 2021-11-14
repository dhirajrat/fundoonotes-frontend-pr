import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  // createNoteForm
  createNoteForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.createNoteForm.valid) {
      console.log('valid');
      this.auth.createNote(this.createNoteForm.value).subscribe(
        (data: any) => {
          this.toastr.success('Note Created Successful', 'Success');
        },
        (error: any) => {}
      );
    }
  }
}
