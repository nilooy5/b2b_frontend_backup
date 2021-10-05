import { Component, OnInit } from '@angular/core';
import {ProcurementTenderDetailSharedService} from '../../../procurement-tender-detail-shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../../../services/storage.service';

@Component({
    selector: 'app-procurement-tender-detail-messaging',
    templateUrl: './procurement-tender-detail-messaging.component.html',
    styleUrls: ['./procurement-tender-detail-messaging.component.scss']
})

export class ProcurementTenderDetailMessagingComponent implements OnInit {

    bidId;
    procurementId;
    bidInfo;
    messages: any[] = [];

    constructor(private sharedService: ProcurementTenderDetailSharedService,
                private http: ShebaHttpService,
                private storage: StorageService,
                private router: Router,
                private route: ActivatedRoute) {

        this.bidId = this.route.snapshot.queryParamMap.get('id');
        this.route.parent.parent.params.subscribe(value => this.procurementId = value.procurement_id);

        this.sharedService.procurementDetails.subscribe(res => {
            // console.log(res);
        });

        this.route.data.subscribe(res => {
            // console.log(res.messages.comments);
            this.messages = res.messages.comments || [];
            this.bidInfo = res.bidDetails.bid;
        });

        this.getMessages();
    }

    ngOnInit() { }

    getMessages() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/bids/' + this.bidId + '/comments?sort=desc')
            .toPromise()
            .then(res => {
                this.messages = res.comments || [];
            });
    }

    handleMessage(state) {
        if (state) {
            this.getMessages();
        }
    }

    onClickHire() {
        this.router.navigate(['/', 'dashboard', 'procurement', 'hiring', 'request'], {queryParams: {id: this.bidId, procurement: this.procurementId}});
    }

    onClickViewQuotation() {
        this.router.navigate(['/', 'dashboard', 'procurement', this.procurementId, 'quotation'], {queryParams: {id: this.bidId}});
    }

}
