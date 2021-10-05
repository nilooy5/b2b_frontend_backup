import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TenderService} from '../../../../../../services/tender-service/tender.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {StorageService} from '../../../../../../services/storage.service';
import {MatDialog} from '@angular/material';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {Location} from '@angular/common';
import {ProcurementBidsService} from '../../procurement-tender-detail/procurement-bids.service';

@Component({
    selector: 'app-procurement-tender-add-success',
    templateUrl: './procurement-tender-add-success.component.html',
    styleUrls: ['./procurement-tender-add-success.component.scss']
})
export class ProcurementTenderAddSuccessComponent implements OnInit {

    status;
    isPublished;
    procurementID;
    generalInformation;
    additionalInformation;
    loadingRfq = false


    constructor(private tenderService: TenderService,
                private storage: StorageService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private http: ShebaHttpService,
                public dialog: MatDialog,
                public pop: PopAlertService,
                private location: Location,
                private procurementBidsService: ProcurementBidsService,
    ) {
        this.isPublished = this.activatedRoute.snapshot.queryParamMap.get('publish');
        this.procurementID = this.activatedRoute.snapshot.queryParamMap.get('procurementId');
    }


    ngOnInit() { }


    onPublish(isPublished) {
        const submitData = {
            is_published: isPublished
        };

        this.postToApi(submitData);
    }

    onRFQDetails() {
        this.router.navigate(['/dashboard/procurement', this.procurementID]);
        this.tenderService.clearStorage();
    }

    postToApi(submitData) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementID + '/publish', submitData).toPromise().then(res => {
            if (res.code === 200) {
                this.isPublished = (submitData.is_published).toString();
                this.router.navigate(['/', 'dashboard', 'procurement', 'create', 'success'], {queryParams: {publish: submitData.is_published, procurementId: this.procurementID}}).catch(err => {
                    this.pop.open(err);
                });
            } else {
                this.pop.open('Failed');
            }
        });

    }

    redirectToProcurement(id) {
        this.loadingRfq = true;
        this.procurementBidsService.fetchAllBids(id).then(res => {
            // @ts-ignore
            if (res.length) {
                this.router.navigate(['/', 'dashboard', 'procurement', id]);
            } else {
                this.router.navigate(['/', 'dashboard', 'procurement', id, 'details']);
            }
        }).catch(err => {
            this.router.navigate(['/', 'dashboard', 'procurement', id, 'details']);
        });
    }


}
