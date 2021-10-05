import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-department-add-modal',
    templateUrl: './department-add-modal.component.html',
    styleUrls: ['./department-add-modal.component.scss']
})
export class DepartmentAddModalComponent implements OnInit {
    departmentInformation: FormGroup;
    departmentInformationData: any;
    showFormValidationError = false;

    constructor(
        public dialogRef: MatDialogRef<DepartmentAddModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) { }

    ngOnInit() {
        this.departmentInformation = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    submit() {
        this.showFormValidationError = true;

        const data = this.departmentInformation.getRawValue();

        if (data.name && data.description) {
            this.http.post('/v2/businesses/' + this.storage.user.business_id + '/departments', data).toPromise().then(res => {
                if (res.code === 200) {
                    this.pop.open(res.message);
                    this.dialogRef.close(data);
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.pop.open(err.message);
            });
        }
    }

    close() {
        this.dialogRef.close();
    }

}
