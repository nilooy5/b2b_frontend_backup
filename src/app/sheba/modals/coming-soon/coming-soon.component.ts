import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ComingSoonComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {}
  ) { }

  ngOnInit() {
  }

  close() {
      this.dialogRef.close();
  }

}
