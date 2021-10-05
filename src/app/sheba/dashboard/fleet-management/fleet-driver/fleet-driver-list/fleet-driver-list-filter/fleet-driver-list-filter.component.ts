import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {BulkUploadModalComponent} from "../../../../../../modules/bulk-upload-modal/bulk-upload-modal.component";
import {ShebaHttpService} from "../../../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../../../services/storage.service";
import {ConfirmationModalModule} from "../../../../../modals/confirmation-modal/confirmation-modal.module";
import {ConfirmationModalComponent} from "../../../../../modals/confirmation-modal/confirmation-modal.component";

@Component({
    selector: 'app-fleet-driver-list-filter',
    templateUrl: './fleet-driver-list-filter.component.html',
    styleUrls: ['./fleet-driver-list-filter.component.scss']
})
export class FleetDriverListFilterComponent implements OnInit {

    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();

    private bulkUploadDialog;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.filter = {
            status: null,
            type: null,
            department: null,
            page: 0
        };
    }

    ngOnInit() {
    }

    selectStatus(status) {
        this.filter.status = status.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectType(type) {
        this.filter.type = type.target.value;
        this.filterEmitter.emit(this.filter);
    }

    search(key) {
        this.searchEmitter.emit(key.target.value);
    }

    selectSort(sort) {
        this.sortEmitter.emit(sort.target.value);
    }

    selectDepartment(dept) {
        this.filter.department = dept.target.value;
        this.filterEmitter.emit(this.filter);
    }

    addItem() {
        this.router.navigate(['/', 'dashboard', 'fleet-management', 'drivers', 'add']).catch(err => {
            console.log(err);
        });
    }

    addBulkDriver() {
        this.bulkUploadDialog = this.dialog.open(BulkUploadModalComponent, {
            data: {type: 'driver', link: 'https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/bulk_upload_template/driver_bulk_upload_attchment_file.xlsx' },
            minWidth: '500px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        })

        this.bulkUploadDialog.componentInstance.upload.subscribe((res) => {
            this.submitBulkDriver(res);
        });
    }

    submitBulkDriver(bulk_file) {
        const data = {
            file: bulk_file
        };

         this.bulkUploadDialog.close();

        this.http.postWithFiles('/v2/members/' + this.storage.user.member_id + '/drivers/bulk-store', data).toPromise().then(res => {
            let data = {};
            if ( res.code === 200 ) {
                data = {type: 'success', title: 'Drivers successfully uploaded', text: res.message, actionText: 'Close' };
            } else {
                data = {type: 'failure', title: 'Something went wrong', text: res.message, actionText: 'Close' };
            }

            this.dialog.open(ConfirmationModalComponent, {
                data,
                minWidth: '500px',
                height: 'auto',
                panelClass: 'dialog-confirmation'
            });
        });
    }

    nextPage() {
        this.filter.page = this.filter.page += 10;
        this.filterEmitter.emit(this.filter);
    }

    PreviousPage() {
        if (this.filter.page > 1) {
            this.filter.page =  this.filter.page -= 10;
            this.filterEmitter.emit(this.filter);
        }
    }

}
