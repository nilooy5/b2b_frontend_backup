import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-department-add-role-modal',
    templateUrl: './department-add-role-modal.component.html',
    styleUrls: ['./department-add-role-modal.component.scss']
})
export class DepartmentAddRoleModalComponent implements OnInit {
    roleInformation: FormGroup;
    roleInformationData: any;
    showFormValidationError = false;
    department: any;

    constructor(
        public dialogRef: MatDialogRef<DepartmentAddRoleModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.department = data.department;
    }

    ngOnInit() {
        this.roleInformation = this.fb.group({
            department_id: [this.department.id, Validators.required],
            name: ['', Validators.required],
        });
    }

    submit() {
        this.showFormValidationError = true;

        const data = this.roleInformation.getRawValue();

        if (data.department_id && data.name) {
            this.http.post('/v2/businesses/' + this.storage.user.business_id + '/roles', data).toPromise().then(res => {
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
