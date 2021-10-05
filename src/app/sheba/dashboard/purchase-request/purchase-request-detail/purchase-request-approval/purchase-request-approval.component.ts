import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-purchase-request-approval',
    templateUrl: './purchase-request-approval.component.html',
    styleUrls: ['./purchase-request-approval.component.scss'],
})
export class PurchaseRequestApprovalComponent implements OnInit {
    employees: any[];
    selected = [];
    constructor( public dialogRef: MatDialogRef<PurchaseRequestApprovalComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: { b: any},
                 private http: ShebaHttpService,
                 private storage: StorageService
    ) {
        this.getEmployees();
    }

    ngOnInit() {
    }


    select() {
        // const data = this.form.getRawValue();
        this.dialogRef.close(/*{options: data, quantity: this.quantity}*/);
    }

    close() {
        this.dialogRef.close();
    }

    selectForm(i) {
        const selected = this.selected.indexOf(i) !== -1;
        if (selected) {
            let index = this.selected.indexOf(i);
            this.selected.splice(index, 1);
        } else {
            this.selected.push(i);
        }
    }

    closeModal(status) {
        this.close();
    }

    next() {
        this.dialogRef.close({selected: this.selected});
    }

    getEmployees() {
        return this.http.get('/v2/businesses/' + this.storage.user.business_id + '/employees').toPromise().then(res => {
            this.employees = res.employees;
        });
    }

    isSelected(i) {
        if (this.selected) {
            return this.selected.indexOf(i) !== -1;
        } else {
            return false;
        }
    }
}
