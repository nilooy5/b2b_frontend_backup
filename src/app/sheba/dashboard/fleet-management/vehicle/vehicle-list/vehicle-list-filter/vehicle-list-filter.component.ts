import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {BulkUploadModalComponent} from "../../../../../../modules/bulk-upload-modal/bulk-upload-modal.component";
import {ConfirmationModalComponent} from "../../../../../modals/confirmation-modal/confirmation-modal.component";
import {StorageService} from "../../../../../../services/storage.service";
import {ShebaHttpService} from "../../../../../../modules/sheba-http/sheba-http.service";

@Component({
    selector: 'app-vehicle-list-filter',
    templateUrl: './vehicle-list-filter.component.html',
    styleUrls: ['./vehicle-list-filter.component.scss']
})
export class VehicleListFilterComponent implements OnInit {

    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();
    @Input() departments: any[];

    private bulkUploadDialog;

    constructor(
        private router: Router,
        private http: ShebaHttpService,
        public dialog: MatDialog,
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
        this.router.navigate(['/', 'dashboard', 'fleet-management', 'vehicle', 'add']).catch(err => {
            console.log(err);
        });
    }

    addBulkVehicle() {
        this.bulkUploadDialog = this.dialog.open(BulkUploadModalComponent, {
            data: {
                type: 'vehicle',
                link: 'https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/bulk_upload_template/vehicle_bulk_upload_attachment_file.xlsx'
            },
            minWidth: '500px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });

        this.bulkUploadDialog.componentInstance.upload.subscribe((res) => {
            this.submitBulkVehicle(res);
        });
    }

    selectOwner(owner) {
        this.filter.owner_type = owner.target.value;
        this.filterEmitter.emit(this.filter);
    }

    submitBulkVehicle(bulkFile) {
        const submitData = {
            file: bulkFile
        };

        this.bulkUploadDialog.close();
        console.log(submitData);

        this.http.postWithFiles('v2/members/' + this.storage.user.member_id + '/vehicles/bulk-store', submitData).toPromise().then(res => {
            let data = {};
            if (res.code === 200) {
                data = {
                    type: 'success',
                    title: 'Vehicle successfully uploaded',
                    text: res.message,
                    actionText: 'Close'
                };
            } else {
                data = {type: 'failure', title: 'Something went wrong', text: res.message, actionText: 'Close'};
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
            this.filter.page = this.filter.page -= 10;
            this.filterEmitter.emit(this.filter);
        }
    }
}
