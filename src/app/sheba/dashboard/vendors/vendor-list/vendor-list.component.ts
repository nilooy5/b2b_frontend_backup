import { Component, OnInit } from '@angular/core';
import {Vendor} from "../../../../types/vendors";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {appConfig} from "../../../../config/app.config";
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../services/storage.service";
import {BulkUploadModalComponent} from "../../../../modules/bulk-upload-modal/bulk-upload-modal.component";
import {ConfirmationModalComponent} from "../../../modals/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  vendors: Vendor[];
  search: string;
  dataSource: MatTableDataSource<any>;
  displayColumns = ['name', 'type', 'mobile', 'action'];
  appConfig = appConfig;

  private bulkUploadDialog;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      public dialog: MatDialog,
      private http: ShebaHttpService,
      private storage: StorageService
  ) {
    this.route.data.subscribe(res => {
      this.setVendors(res.vendors);
    });
  }

  ngOnInit() {
  }

  setVendors(vendors: Vendor[]) {
    this.vendors = vendors ? vendors : [];
    this.dataSource = new MatTableDataSource(this.vendors);
  }

  filterVendors() {
    if (this.search) {
      this.dataSource.filter = this.search.trim().toLowerCase();
    } else {
      this.dataSource.filter = null;
    }
  }

    addItem() {
        this.router.navigate(['/', 'dashboard', 'vendors', 'add']).catch(err => {
            console.log(err);
        });
    }

    addBulkVendor() {
        this.bulkUploadDialog = this.dialog.open(BulkUploadModalComponent, {
            data: {type: 'vendor', link: 'https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/bulk_upload_template/vendor_bulk_upload_atttachment_file.xlsx' },
            minWidth: '500px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });

        this.bulkUploadDialog.componentInstance.upload.subscribe((res) => {
            this.submitBulkVendor(res);
        });
    }

    submitBulkVendor(bulk_file) {
        const data = {
            file: bulk_file
        };

        this.bulkUploadDialog.close();

        this.http.postWithFiles('/v2/businesses/' + this.storage.user.business_id + '/vendors/bulk-store', data).toPromise().then(res => {
            let data = {};
            if ( res.code === 200 ) {
                data = {type: 'success', title: 'Vendor successfully uploaded', text: res.message, actionText: 'Close' };
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

}
