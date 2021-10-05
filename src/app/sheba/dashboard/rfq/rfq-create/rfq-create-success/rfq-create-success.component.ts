import {Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { Breadcrumb } from '../../../../../types/general';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-create-success',
    templateUrl: './rfq-create-success.component.html',
    styleUrls: ['./rfq-create-success.component.scss']
})

export class RfqCreateSuccessComponent implements OnDestroy {

    isPublished;
    tenderID;
    sharingLink;
    showCopyLinkText = false;

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Request for quotation',
            path: '/dashboard/rfq/create'
        },
        {
            title: 'Create new',
            path: '/dashboard/rfq/create'
        }
    ];
    initialSharingOption = 'public';
    selectedSharing =
        {
            label: 'Publish to all vendors',
            value: 'public',
            icon: 'public',
        };

    sharingOptions = [
        {
            label: 'Publish to all vendors',
            value: 'public',
            icon: 'public',
        },
        {
            label: 'Publish to verified vendors',
            value: 'verified',
            icon: 'verified_user',
        },
        {
            label: 'Publish to own listed vendors',
            value: 'own_listed',
            icon: 'list_alt',
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private http: ShebaHttpService,
                private storage: StorageService,
                private router: Router,
                private pop: PopAlertService,
                private route: ActivatedRoute) {
        this.isPublished = this.route.snapshot.queryParamMap.get('publish');
        this.tenderID = this.route.snapshot.queryParamMap.get('tenderId');
        if (this.route.snapshot.queryParamMap.get('link')) {
            this.sharingLink = this.route.snapshot.queryParamMap.get('link');
        }
        this.setBreadcrumb();
        this.setDashboardHeader();
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    setBreadcrumb() {
        this.isPublished === 'draft'
            ? this.breadcrumb.push({ title: 'Draft', isActive: true})
            : this.breadcrumb.push({ title: 'Publish', isActive: true});
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
    }

    setDashboardHeader() {
        this.isPublished === 'draft'
            ? this.dashboardSharedService.changeHeaderTitle('Successfully Created')
            : this.dashboardSharedService.changeHeaderTitle('Successfully Published');
    }

    setSharingOption($event) {
        this.selectedSharing = $event.value;
    }

    postRFQ(value: string) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.tenderID + '/publish';
        const data = {
            is_published: '1',
            sharing_to: value,
        };

        this.http.post(url, data).toPromise().then(res => {
            if ((res.code === 200) && (data.sharing_to === 'public')) {
                this.navigateToSuccessPage('public');
            } else if ((res.code === 200) && (data.sharing_to === 'verified')) {
                this.navigateToSuccessPage('verified');
            } else if ((res.code === 200) && (data.sharing_to === 'own_listed')) {
                this.redirectToInvite(this.tenderID);
            }
        });
    }

    redirectToInvite(tenderId) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite'], {state: {tenderId}});
    }

    navigateToSuccessPage(type: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'success'], {
            queryParams: {
                publish: type,
                tenderId: this.tenderID,
                link: this.sharingLink
            }
        }).then(r => window.location.reload());
    }

    copyLink() {
        this.showCopyLinkText = true;
        setTimeout(() => {
            this.showCopyLinkText = false;
        }, 5000);
    }
}
