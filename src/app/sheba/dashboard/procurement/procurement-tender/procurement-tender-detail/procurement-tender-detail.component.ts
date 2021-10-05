import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {Location} from '@angular/common';
import {ProcurementTenderDetailSharedService} from './procurement-tender-detail-shared.service';
import {ProcurementBidsService} from './procurement-bids.service';
import {environment} from '../../../../../../environments/environment';


@Component({
    selector: 'app-procurement-tender-detail',
    templateUrl: './procurement-tender-detail.component.html',
    styleUrls: ['./procurement-tender-detail.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProcurementTenderDetailComponent implements OnInit, AfterViewInit {

    currentRoute;
    isRFQPublished;
    procurementDetails;
    hasBids = true;
    showBackToComparison = false;
    showDownloadQuotation = false;
    bidId;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService,
                private location: Location,
                private procurementBidsService: ProcurementBidsService,
                private sharedService: ProcurementTenderDetailSharedService) {

        this.router.events.subscribe(e => {
            if (e instanceof  NavigationEnd) {
                this.currentRoute = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentRoute = this.currentRoute.split('?')[0];
                this.hasBids = this.currentRoute !== 'details';
                this.showDownloadQuotation = this.currentRoute === 'quotation';
            }

            if (e instanceof  ActivationEnd) {
                if (e.snapshot.queryParams.id !== undefined) {
                    this.bidId = e.snapshot.queryParams.id;
                }
            }
        });

    }


    ngOnInit() {
        this.route.data.subscribe(res => {
            this.procurementDetails = res.procurementDetails;
            // this.getBidCount(this.procurementDetails.id);
            this.sharedService.addProcurementDetails(res.procurementDetails);
        });

        this.getBidCount(this.route.snapshot.params.procurement_id);

        this.isRFQPublished = this.procurementDetails.published_at;
    }

    onPublish(isPublished) {

        const submitData = {
            is_published: isPublished
        };

        this.http.post('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementDetails.id + '/publish', submitData).toPromise().then(res => {
            if (res.code === 200) {
                this.router.navigate(['/', 'dashboard', 'procurement', 'success'], {queryParams: {publish: submitData.is_published, procurementId: this.procurementDetails.id}}).catch(err => {
                    this.pop.open(err);
                });
            } else {
                this.pop.open('Failed');
            }
        });
    }

    onPrint() {
        window.print();
    }

    getDownloadLink() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id
            + '/procurements/' + this.procurementDetails.id + '/download?token=' + this.storage.user.token;
    }
    getQuotationLink() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id
            + '/bids/' + this.bidId + '/download?token=' + this.storage.user.token;
    }

    ngAfterViewInit(): void {
        this.route.queryParams.subscribe(res => {
            if (res.print) {
                this.onPrint();
                this.location.back();
            }
        });
    }

    onViewDetails() {
        this.router.navigate(['/', 'dashboard', 'procurement', this.procurementDetails.id, 'details']);
    }

    getBidCount(id) {
        this.procurementBidsService.fetchAllBids(id).then(res => {
            // @ts-ignore
            this.router.events.subscribe(e => {
                if (e instanceof  NavigationEnd) {
                    // @ts-ignore
                    this.showBackToComparison = !!(e.url.includes('details') && res.length);
                }
            });

        }).catch(err => {});
    }

}
