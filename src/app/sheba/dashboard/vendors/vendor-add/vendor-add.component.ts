import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-vendor-add',
    templateUrl: './vendor-add.component.html',
    styleUrls: ['./vendor-add.component.scss']
})

export class VendorAddComponent implements OnInit {

    isLinear = true;
    vendorInformation: FormGroup;
    registrationInformation: FormGroup;
    otherInformation: FormGroup;
    showVendorInformationError: boolean;
    showRegistrationInformationError: boolean;
    showOtherInformationError: boolean;
    submittingVendor = false;
    showConfirmation = false;
    confirmMessage: string;
    confirmTitle: string;
    confirmType: string;
    masterCategory: any[] = [];
    vendorId: any;

    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    setData(data) {
        this.masterCategory = data.masterCategory as any[];
    }

    ngOnInit() {
        this.vendorInformation = this.fb.group({
            vendorLogo: [''],
            vendorName: ['', Validators.required],
            vendorPhoneNumber: ['', Validators.required],
            vendorEmail: [''],
            vendorAddress: [''],
            masterCategory: [''],
        });
        this.registrationInformation = this.fb.group({
            licenseNumber: [''],
            licenseImage: [''],
            vatRegistrationNumber: [''],
            vatLicenseImage: [''],
        });
        this.otherInformation = this.fb.group({
            contactPersonName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            NID: [''],
            NIDImage: [''],
        });
    }

    submitVendor() {
        const vendorData = this.vendorInformation.getRawValue();
        const registrationData = this.registrationInformation.getRawValue();
        const otherData = this.otherInformation.getRawValue();

        if (this.otherInformation.valid) {
            const submitData = {
                vendor_name: vendorData.vendorName,
                vendor_mobile: vendorData.vendorPhoneNumber,
                vendor_email: vendorData.vendorEmail,
                vendor_address: vendorData.vendorAddress,
                vendor_master_categories: vendorData.masterCategory,

                trade_license_number: registrationData.licenseNumber,
                trade_license_document: registrationData.licenseImage,
                vat_registration_number: registrationData.vatRegistrationNumber,
                vat_registration_document: registrationData.vatLicenseImage,

                resource_name: otherData.contactPersonName,
                resource_mobile: otherData.phoneNumber,
                resource_nid_number: otherData.NID,
                resource_nid_document: otherData.NIDImage,
            };

            if (vendorData.vendorLogo) {
                submitData['vendor_image'] = vendorData.vendorLogo;
            }

            this.submittingVendor = true;

            this.http.postWithFiles('v2/businesses/' + this.storage.user.business_id + '/vendors', submitData).toPromise()
                .then(res => {
                    this.submittingVendor = false;
                    if (res.code === 200) {
                        this.vendorId = res.vendor_id;
                        this.showConfirmation = true;
                        this.confirmType = 'success';
                        this.confirmTitle = 'Request Successful!';
                        this.confirmMessage = res.message || 'Vendor Added successfully';
                    } else {
                        this.pop.open(res.message);
                        // this.showConfirmation = true;
                        // this.confirmType = 'failure';
                        // this.confirmTitle = 'Request Failed';
                        // this.confirmMessage = res.message;
                    }
                }).catch(err => {
                this.submittingVendor = false;
                this.showConfirmation = true;
                this.confirmType = 'failure';
                this.confirmTitle = 'Request Failed';
                this.confirmMessage = err.message;
            });
        } else {
            this.showOtherInformationError = true;
        }

    }

    viewDetails() {
        this.router.navigate(['/', 'dashboard', 'vendors', this.vendorId, 'details', 'company-info']).catch(err => {
            console.log(err);
        });
    }
}
