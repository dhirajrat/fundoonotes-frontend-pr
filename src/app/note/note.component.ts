import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  fundooImage = 'assets/images/FundooNotes.png';

  value = true;
  constructor() {}

  ngOnInit(): void {}
}
