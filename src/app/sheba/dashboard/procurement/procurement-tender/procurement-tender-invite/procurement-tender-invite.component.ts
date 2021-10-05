import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Vendor} from '../../../../../types/vendors';
import {MultiSelectWithSearchComponent} from '../../../../../modules/multi-select-with-search/multi-select-with-search.component';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {ProcurementVendorInviteService} from '../procurement-vendor-invite.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
    selector: 'app-procurement-tender-invite',
    templateUrl: './procurement-tender-invite.component.html',
    styleUrls: ['./procurement-tender-invite.component.scss']
})
export class ProcurementTenderInviteComponent implements OnInit {
    selectedVendors: Vendor[] = [];
    vendors: Vendor[] = [];
    vendorsForMultiSelect: any[] = [];
    procurementId: any;
    showConfirm = false;
    confirmType: any;
    confirmTitle: any;
    confirmMessage: any;
    inviteRequestLoading = false;

    // the child component
    @ViewChild('multiSelectWithSearch')
    private multiSelectWithSearch: MultiSelectWithSearchComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private procurementVendorInviteService: ProcurementVendorInviteService,
        private pop: PopAlertService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.vendors);
        });

        this.procurementId = this.route.snapshot.queryParams.procurement || null;
    }

    ngOnInit() {

        console.log(this.route.snapshot.queryParamMap.has('fromSummary'));
    }

    setData(data: Vendor[]) {
        this.vendors = data;
        this.vendorsForMultiSelect = this.vendors.length ?
            this.vendors.map(vendor => {
                return {
                    id: vendor.id,
                    title: vendor.name,
                    address: vendor.address,
                    info: [vendor.mobile],
                    img: vendor.logo
                };
            })
            : [];
    }

    handleVendors(vendors) {
        this.selectedVendors = vendors ? this.vendors.filter(vendor => {
            return vendors.findIndex(v => v === vendor.id) !== -1;
        }) : [];
    }

    removeItem({id}) {
        const vendorIndex = this.selectedVendors.findIndex(v => v.id === id);
        this.selectedVendors.splice(vendorIndex, 1);

        this.multiSelectWithSearch.removeItem({id});
    }

    inviteVendors() {
        this.inviteRequestLoading = true;

        if (this.procurementId) {
            this.procurementVendorInviteService.submitVendors(this.procurementId, this.selectedVendors.map(v => v.id)).then(res => {
                this.confirmType = 'success';
                this.confirmTitle = 'Invitation has been Sent Successfully';
                this.confirmMessage = 'Your vendors will get notifications and you can also ask them to participate to TENDER.';
                this.showConfirm = true;
            }).catch(err => {
                this.confirmType = 'failure';
                this.confirmTitle = 'Invitation Failed';
                this.confirmMessage = err.message;
                this.showConfirm = true;
            });
        } else {
            this.pop.open('No Procurement Found');
        }

        this.inviteRequestLoading = true;
    }

    viewProcurementDetails() {
        this.router.navigate(['/', 'dashboard', 'procurement', this.procurementId]).catch(err => {
            console.log(err);
        });
    }

    resetInvite() {
        this.selectedVendors = [];
        this.showConfirm = false;
        this.multiSelectWithSearch.reset();
    }
}
