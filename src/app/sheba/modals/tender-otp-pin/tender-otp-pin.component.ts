import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
// import {TenderVerifyPhoneComponent} from '../tender-verify-phone/tender-verify-phone.component';

@Component({
  selector: 'app-tender-otp-pin',
  templateUrl: './tender-otp-pin.component.html',
  styleUrls: ['./tender-otp-pin.component.scss']
})
export class TenderOtpPinComponent {

    is_submit = false;

  constructor(
      public dialogRef: MatDialogRef<TenderOtpPinComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { type: string, errorType: string },
      private router: Router,
      private dialog: MatDialog
  ) {
      dialogRef.disableClose = true;
  }

  goToRfqList() {
      this.dialogRef.close();
      this.router.navigate(['/', 'dashboard', 'procurement']);
  }

  submit() {
  }

  anotherNumberTry() {
      this.dialogRef.close();
      // this.phoneInputModal();
  }

  // phoneInputModal() {
  //     const data = {
  //         type: 'default',
  //         title: 'Enter phone number',
  //         text: 'We will send you a verification to this number to verify yourself ',
  //         actionText: 'CONTINUE'
  //     };
  //
  //     this.dialog.open(TenderVerifyPhoneComponent, {
  //         data,
  //         width: '570px',
  //         height: '450px',
  //         panelClass: 'dialog-confirmation'
  //     });
  // }
}
