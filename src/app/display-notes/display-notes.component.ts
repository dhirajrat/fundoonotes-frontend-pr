import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss'],
})
export class DisplayNotesComponent implements OnInit {
  noteList: any = [];
  errorMassage: string | undefined;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.fetchNotes().subscribe(
      (data) => {
        this.noteList = data.data;
        console.log('these are the notes: ', this.noteList);
      },
      (error) => {
        this.errorMassage = error.message;
      }
    );
  }
}
