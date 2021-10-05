import { Component, OnInit } from '@angular/core';
import {AcknowledgementModalComponent} from '../../../fleet-inspection/fleet-inspection-history/fleet-inspection-history-details/acknowledgement-modal/acknowledgement-modal.component';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-inspection-history-details',
    templateUrl: './inspection-history-details.component.html',
    styleUrls: ['./inspection-history-details.component.scss']
})
export class InspectionHistoryDetailsComponent implements OnInit {
    inspectionInformation: FormGroup;
    inspectionInformationEnable = false;
    inspectionInformationData: any;
    inspection: any = null;
    inspectionID: any = null;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.inspection);
        });

        this.inspectionInformationData = {
            odometer: '',
            engine: true,
            transmission: true,
            steering: false,
            windshield: true
        };

        this.inspectionID = this.route.snapshot.params.inspection_id;
    }

    ngOnInit() {
        this.inspectionInformation = this.fb.group({});

        if (this.inspection.inspection_items) {
            this.inspection.inspection_items.forEach(item => {
                this.inspectionInformation.addControl('control' + item.id, new FormControl(item.result, Validators.required));
            });
        }


    }

    setData(data) {
        this.inspection = data as any;
    }

    acknowledge(id) {
        this.dialog.open(AcknowledgementModalComponent, {
            data: {},
            minWidth: '570px',
            minHeight: '240px',
            panelClass: 'dialog-confirmation'
        }).afterClosed().subscribe(close => {
            if (close) { this.submitAcknowledgeMent(id, close, true); }
        });
    }

    submitAcknowledgeMent(id, data, doRefresh) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/inspections/' + this.inspectionID + '/items/' + id + '/acknowledge', data).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open(res.message);
                if (doRefresh) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.pop.open(err.message);
        });
    }

    submitInspection() {
        this.inspectionInformationEnable = false;

        const data = this.inspectionInformation.getRawValue();

        console.log(data);
    }

    createIssue(id) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/issues', {
            inspection_item_id: id
        }).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open(res.message);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.pop.open(err.message);
        });
    }
}
