import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {AcknowledgementModalComponent} from './acknowledgement-modal/acknowledgement-modal.component';

@Component({
    selector: 'app-fleet-inspection-history-details',
    templateUrl: './fleet-inspection-history-details.component.html',
    styleUrls: ['./fleet-inspection-history-details.component.scss']
})
export class FleetInspectionHistoryDetailsComponent implements OnInit {
    inspection: any = null;
    inspectionID: any = null;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
        private router: Router
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.inspection);
        });
        this.inspectionID = this.route.snapshot.params.inspection_id;
    }

    ngOnInit() {
    }

    setData(data) {
        this.inspection = data as any;
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
}
