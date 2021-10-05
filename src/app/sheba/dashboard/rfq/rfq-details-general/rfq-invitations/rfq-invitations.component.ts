import {Component, OnDestroy} from '@angular/core';
import {Breadcrumb} from '../../../../../types/general';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {MatTableDataSource} from '@angular/material';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-rfq-invitations',
    templateUrl: './rfq-invitations.component.html',
    styleUrls: ['./rfq-invitations.component.scss']
})

export class RfqInvitationsComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    rfq_id: number;
    show_invitations = false;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['vendor_name', 'invited_on', 'participation', 'actions'];
    filteredInvitations: any[];
    sort_invitations: any = [
        {sort_column: 'sort_by_name', sort_type: 'asc'},
        {sort_column: 'sort_by_date', sort_type: 'asc'},
        {sort_column: 'sort_by_status', sort_type: 'asc'},
    ];
    can_invite_again;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private router: Router,
                private storage: StorageService,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
        const rfqId = activatedRoute.snapshot.parent.params.id;
        this.rfq_id = rfqId;
        this.initializeBreadCrumb(rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.activatedRoute.data.subscribe(res => {
            if (res.rfqInvitations.is_invitation_available) {
                this.setInvitations(res.rfqInvitations.invited_partners);
            } else {
                this.setEmptyList();
            }
            this.setStatusLogic(res.rfqInvitations.procurement_status);
        });
    }

    initializeBreadCrumb(rfqId: number) {
        this.breadcrumb = [
            {
                title: 'List',
                path: '/dashboard/rfq/list'
            },
            {
                title: 'Tender Details',
                path: `/dashboard/rfq/list/${rfqId}/details`
            },
            {
                title: 'Invitations',
                isActive: true
            }
        ];
    }

    setInvitations(invitations) {
        this.show_invitations = true;
        this.filteredInvitations = invitations;
        this.dataSource = new MatTableDataSource(this.filteredInvitations);
    }

    setStatusLogic(status) {
       this.can_invite_again = status === 'Hired' || status === 'Closed';
    }

    setEmptyList() {
        this.filteredInvitations = [];
        this.dataSource = new MatTableDataSource(this.filteredInvitations);
    }

    sort(property) {
        this.sort_invitations.forEach((status) => {
            if (status.sort_column === property) {
                this.sortWithFilter(status.sort_column, status.sort_type);
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortWithFilter(sort_column, sort_type) {
        const filterParams = {};
        filterParams[sort_column] = sort_type;
        this.getFilteredDetails(filterParams);
    }

    getFilteredDetails(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfq_id + '/invitations';
        this.http.get(url, {params: filters, responseType: 'text'}).toPromise().then((res) => {
            this.setInvitations(JSON.parse(res).invited_partners);
        });
    }

    inviteAgain(vendor_id) {
        const partners = [];
        partners.push(vendor_id);
        const api_data = {
            partners: JSON.stringify(partners)
        };
        this.postToApi(api_data);
    }

    redirectToInvite() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite'], {state: {tenderId: this.rfq_id}});
    }

    postToApi(data) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfq_id + '/invitations', data).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open('Invitation Request Successful');
            } else {
                this.pop.open('Failed');
            }
        });
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }
}
