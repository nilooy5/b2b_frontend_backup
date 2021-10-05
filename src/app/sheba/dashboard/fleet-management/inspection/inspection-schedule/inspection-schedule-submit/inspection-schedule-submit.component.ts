import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-inspection-schedule-submit',
    templateUrl: './inspection-schedule-submit.component.html',
    styleUrls: ['./inspection-schedule-submit.component.scss']
})
export class InspectionScheduleSubmitComponent implements OnInit {
    inspectionInformationInput: FormGroup;
    inspectionInformationRadio: FormGroup;
    inspectionInformationNote: FormGroup;
    showFormErrors = false;
    inspection: any = null;
    inspectionItemsInput: any[];
    inspectionItemsRadio: any[];
    inspectionId = null;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
        private fb: FormBuilder,
        private router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.inspectionId = route.snapshot.params.inspection_id;
        this.route.data.subscribe(res => {
            this.setData(res.inspection);
            if (res.inspection.submitted_date && res.inspection.submitted_date !== '') {
                this.router.navigate(['/', 'dashboard','fleet-management', 'submit-inspection', 'history', this.inspectionId]).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    ngOnInit() {
        this.inspectionInformationInput = this.fb.group({});
        this.inspectionInformationRadio = this.fb.group({});
        this.inspectionInformationNote = this.fb.group({});

        if (this.inspection.inspection_items) {
            this.inspection.inspection_items.forEach(item => {
                if (item.input_type !== 'radio') {
                    this.inspectionInformationInput.addControl(item.id, new FormControl(''));
                    if (item.variables.is_required) {
                        this.inspectionInformationInput.controls[item.id].setValidators([Validators.required]);
                    }
                } else {
                    this.inspectionInformationRadio.addControl(item.id, new FormControl(''));
                    if (item.variables.is_required) {
                        this.inspectionInformationRadio.controls[item.id].setValidators([Validators.required]);
                    }
                }
            });
        }

        this.inspectionInformationNote.addControl('note', new FormControl('', Validators.required));
    }

    setData(data) {
        this.inspection = data as any;

        this.inspectionItemsInput = this.inspection.inspection_items.filter(item => item.input_type !== 'radio');
        this.inspectionItemsRadio = this.inspection.inspection_items.filter(item => item.input_type === 'radio');
    }

    checkComment(id, {value}) {
        console.log(id, value)
        const d = this.document.getElementById('item-comment-' + id) as any;
        const comment = d.value;

        if (value === 'failed' && !comment) {
            document.getElementById('item-comment-error' + id).innerHTML = 'Please comment reason for fail';
        } else {
            document.getElementById('item-comment-error' + id).innerHTML = '';
        }
    }

    validateInspectionForm() {
        const inputData = this.inspectionInformationInput.getRawValue();
        const radioData = this.inspectionInformationRadio.getRawValue();
        const noteData = this.inspectionInformationNote.getRawValue();
        const items = [];
        let data = {};

        this.showFormErrors = true;

        if (this.inspectionInformationInput.valid) {
            for (const key in inputData) {
                if (inputData.hasOwnProperty(key)) {
                    items.push({
                        id: parseInt(key, 10),
                        result: inputData[key],
                        comment: ''
                    });
                }
            }
        }

        if (this.inspectionInformationRadio.valid) {
            for (const key in radioData) {
                if (radioData.hasOwnProperty(key)) {
                    const d = this.document.getElementById('item-comment-' + key) as any;
                    const comment = d.value;
                    if (radioData[key] === 'failed' && !comment) {
                        break;
                    }
                    items.push({
                        id: parseInt(key, 10),
                        result: radioData[key],
                        comment
                    });
                }
            }
        }

        if (items.length === this.inspection.inspection_items.length && this.inspectionInformationNote.valid) {
            data = {
                items: JSON.stringify(items),
                submission_note: noteData.note || ''
            };

            this.submitInspection(data);
        }
    }

    submitInspection(data) {
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/inspections/' + this.inspectionId + '/submit', data)
            .toPromise()
            .then(res => {
                if (res.code === 200) {
                    this.pop.open(res.message);
                    const self = this;
                    setTimeout(() => {
                        this.router.navigate(['/', 'dashboard', 'fleet-management', 'submit-inspection', 'history', this.inspectionId]).catch(err => {
                            console.log(err);
                        });
                    });
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
            this.pop.open(err.message);
        });
    }

}
