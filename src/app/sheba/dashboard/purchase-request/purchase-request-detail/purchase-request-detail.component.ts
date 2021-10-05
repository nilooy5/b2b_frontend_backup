import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';
import {PurchaseRequestFormSelectComponent} from '../purchase-request-create/purchase-request-form-select/purchase-request-form-select.component';
import {MatDialog} from '@angular/material';
import {PurchaseRequestRejectNoteComponent} from './purchase-request-reject-note/purchase-request-reject-note.component';
import {PurchaseRequestApprovalComponent} from './purchase-request-approval/purchase-request-approval.component';

@Component({
    selector: 'app-purchase-request-detail',
    templateUrl: './purchase-request-detail.component.html',
    styleUrls: ['./purchase-request-detail.component.scss']
})
export class PurchaseRequestDetailComponent implements OnInit {

    details: any;
    displayColumns = [];
    dataSource: MatTableDataSource<any>;
    purchaseRequestsData: any;
    members: any[];
    statuses = {
        pending: 'warning',
        approved: 'success',
        need_approval: 'primary',
        rejected: 'danger'
    };
    statusReadableNames = {
        pending: 'Pending',
        approved: 'Approved',
        need_approval: 'Awaiting Approval',
        rejected: 'Rejected'
    };
    selectedMembers: any[]
    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private dialog: MatDialog,
    ) {
        this.route.data.subscribe(res => {
            this.details = res.detail;
            this.members = res.members;
            // console.log(this.members);
            let firstRow = this.details.items[0];
            firstRow.forEach((column) => {
                this.displayColumns.push(column.title);
            });
            let data = this.details.items;
            let objects = [];
            data.forEach((row) => {
                let object = {};
                row.forEach(col => {
                    object[col.title] = col.result;
                })
                objects.push(object);
            });
            this.setData(objects);
        });
    }

    setData(data) {
        this.purchaseRequestsData = data as any[];
        this.dataSource = new MatTableDataSource(this.purchaseRequestsData);
    }

    ngOnInit(): void {
    }

    getStatus(key) {
        return 'badge badge-' + this.statuses[key];
    }

    changeStatus(status, rejection_note = null) {
        const data = {
            status: status,
        };
        if(rejection_note)
            data['rejection_note'] = rejection_note;
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/purchase-requests/' + this.details.id + '/change-status',data).toPromise().then(res => {
            location.reload();
        });
    }

    openRejectionModal() {
        this.dialog.open(PurchaseRequestRejectNoteComponent, {
            data: {

            },
            maxWidth: '50%',
            minWidth: '570px',
            minHeight: '100px',
            panelClass: 'dialog-general'
        }).afterClosed().subscribe(res => {
            if (res.rejection_note) {
               this.changeStatus('rejected', res.rejection_note);
            }
        });
    }

    openApprovalModal() {
        this.dialog.open(PurchaseRequestApprovalComponent, {
            data: {

            },
            minWidth: '570px',
            minHeight: '100px',
            maxWidth: '80%',
            panelClass: 'dialog-general'
        }).afterClosed().subscribe(res => {
            if (res.selected) {
                this.selectedMembers = res.selected;
                let memberID = [];
                this.selectedMembers.forEach((index) => {
                    memberID.push(this.members[index].id);
                });
                this.approveMembers("'" + memberID.join("', '") + "'");
            }
        });
    }

    approveMembers(members) {
        const data = {
            members: members,
        };
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/purchase-requests/' + this.details.id + '/member-approval-request',data).toPromise().then(res => {
            location.reload();
        });
    }

    openProcurement() {
        this.router.navigate(['/', 'dashboard', 'procurement', 'tender', 'create']);
    }

    // editForm(id) {
    //     console.log(id);
    //     // this.router.navigate(['/', 'dashboard', 'purchase-request', 'form-edit', {id}]).catch(err => {
    //     //     console.log(err);
    //     // });
    // }
}
