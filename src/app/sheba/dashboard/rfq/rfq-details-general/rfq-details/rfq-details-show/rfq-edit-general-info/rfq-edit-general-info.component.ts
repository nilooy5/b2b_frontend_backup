import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-rfq-edit-general-info',
  templateUrl: './rfq-edit-general-info.component.html',
  styleUrls: ['./rfq-edit-general-info.component.scss']
})
export class RfqEditGeneralInfoComponent implements OnInit {

    minDate = moment();
    deliveryTimelineObj;
  constructor(
      public dialogRef: MatDialogRef<RfqEditGeneralInfoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { editValues: any },
  ) {
      dialogRef.disableClose = true;
      console.log(this.data.editValues);
  }

  ngOnInit() {
  }

    handleDeliveryTimeline(event: any) {

    }

}
