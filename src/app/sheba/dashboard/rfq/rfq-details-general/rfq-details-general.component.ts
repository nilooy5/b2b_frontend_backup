import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavLink} from '../../../../types/general';
import {DashboardSharedService} from '../../../../services/dashboard-shared.service';
import {StorageService} from '../../../../services/storage.service';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {environment} from '../../../../../environments/environment';
import {MatDialog} from '@angular/material';
import {RfqShareDialogComponent} from './rfq-share-dialog/rfq-share-dialog.component';
import {ComingSoonComponent} from '../../../modals/coming-soon/coming-soon.component';
import {LoadingModalComponent} from '../../../modals/loading-modal/loading-modal.component';

@Component({
    selector: 'app-rfq-details-general',
    templateUrl: './rfq-details-general.component.html',
    styleUrls: ['./rfq-details-general.component.scss']
})

export class RfqDetailsGeneralComponent implements OnInit, OnDestroy {

    toggleSubscription: Subscription;
    isSidebarOpen = false;
    navLinks: NavLink[];
    currentPath: string;
    initialSharingOption = 'public';
    procurementDetails;
    show_alert = true;
    rfq_id: number;
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

    shareDialogRef;
    shareInformation;
    loadingDialogRef;
    can_show_options;

    constructor(private dashboardSharedService: DashboardSharedService,
                private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private dashboardService: DashboardResolveService) {
        this.splitCurrentRouteUrl();
        this.initializeNavigationLinks();
        this.setDashboardHeader();
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe((res) => {
            this.isSidebarOpen = res.open;
        });
        this.activatedRoute.data.subscribe(res => {
            this.procurementDetails = res.rfqDetails.procurement;
            this.shareInformation = res.rfqDetails.share;
            console.log(this.shareInformation);
            this.setStatusLogic();
        });
    }

    splitCurrentRouteUrl() {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                let url = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                url = url.split('?')[0];
                this.currentPath = url;
            }
        });
    }

    initializeNavigationLinks() {
        const rfqId = this.activatedRoute.snapshot.params.id;
        this.rfq_id = rfqId;
        this.navLinks = [
            {
                label: 'Details',
                path: `/dashboard/rfq/list/${rfqId}/details`
            },
            {
                label: 'Comparison',
                path: `/dashboard/rfq/list/${rfqId}/compare`
            },
            {
                label: 'All Biddings',
                path: `/dashboard/rfq/list/${rfqId}/biddings`
            },
            {
                label: 'Invitations',
                path: `/dashboard/rfq/list/${rfqId}/invitations`
            },
            {
                label: 'Hiring History',
                path: `/dashboard/rfq/list/${rfqId}/hiring-history`
            },
        ];
        this.dashboardSharedService.changeRouteNavigation(true, this.navLinks);
    }

    setDashboardHeader() {
        this.dashboardSharedService.changeHeaderTitle('Tender Details');
    }

    ngOnInit() {
    }

    setSharingOption(event) {
        this.selectedSharing = event.value;

    }

    setStatusLogic() {
        this.can_show_options = this.procurementDetails.status === 'Hired' || this.procurementDetails.status === 'Closed';
    }

    postRFQ(value: string) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfq_id + '/publish';
        const data = {
            is_published: '1',
            sharing_to: value,
        };
        this.openLoadingModal();

        this.http.post(url, data).toPromise().then(res => {
            this.loadingDialogRef.close();
            if ((res.code === 200) && (data.sharing_to === 'public')) {
                this.navigateToSuccessPage('public');
            } else if ((res.code === 200) && (data.sharing_to === 'verified')) {
                this.navigateToSuccessPage('verified');
            } else if ((res.code === 200) && (data.sharing_to === 'own_listed')) {
                this.redirectToInvite(this.rfq_id);
            }
        });
    }

    navigateToSuccessPage(type: string) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'success'], {
            queryParams: {
                publish: type,
                tenderId: this.rfq_id,
                link: this.shareInformation.link
            }
        }).then(r => window.location.reload());
    }

    onPrint() {
        const link = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementDetails.id + '/download?token=' + this.storage.user.token;
        this.http.get(link, {responseType: 'arraybuffer'}).subscribe(
            (response) => {
                const blob = new Blob([response], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = blobUrl;
                document.body.appendChild(iframe);
                iframe.contentWindow.print();
            });
    }

    getDownloadLink() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementDetails.id + '/download?token=' + this.storage.user.token;
    }

    redirectToInvite(tenderId) {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite'], {state: {tenderId}});
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeRouteNavigation(false);
        this.dashboardSharedService.changeHeaderTitle(null);
        this.toggleSubscription.unsubscribe();
    }

    shareRfq() {
        this.shareDialogRef = this.dialog.open(RfqShareDialogComponent, {
            data: {
                link: this.shareInformation.link,
                title: this.shareInformation.title,
                description: this.shareInformation.description
            },
            height: 'auto',
            maxWidth: '480px',
            panelClass: 'share-dialog'
        });
    }

    openLoadingModal() {
        let data: { image: string, title: string, text: string };

        data = {
            image: 'assets/svg/hourglass.svg',
            title: 'Tender is Posting',
            text: 'Please wait few moments, your Tender will be ready to receive quotations within a few moments.'
        };


        this.loadingDialogRef = this.dialog.open(LoadingModalComponent, {
            data,
            maxWidth: '570px',
            minWidth: '570px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }
}
