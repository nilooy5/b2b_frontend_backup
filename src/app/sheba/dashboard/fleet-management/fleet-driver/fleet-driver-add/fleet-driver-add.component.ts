import { Component, OnInit } from '@angular/core';
import {FormEssentials} from '../../../../../helpers/classes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {ConfirmationModalComponent} from '../../../../modals/confirmation-modal/confirmation-modal.component';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {MatDialogRef} from '@angular/material';
import {FormTemplateSelectSearchComponent} from '../../form-template-select-search/form-template-select-search/form-template-select-search.component';
import {FormTemplateSelectSearchService} from '../../form-template-select-search/form-template-select-search.service';

@Component({
    selector: 'app-fleet-driver-add',
    templateUrl: './fleet-driver-add.component.html',
    styleUrls: ['./fleet-driver-add.component.scss']
})
export class FleetDriverAddComponent implements OnInit {

    isLinear = true;
    generalInformation: FormGroup;
    userInformation: FormGroup;
    contactInformation: FormGroup;
    showGeneralInformationError = false;
    showUserInformationError = false;
    showContactInformationError = false;
    submittingDriver = false;
    showConfirmation = false;
    confirmMesssage: string;
    confirmTitle: string;
    confirmType: string;
    driverId: any;
    departments: any[] = [];
    roles: any[] = [];
    vehicles: any[] = [];
    vendors: any[] = [];
    hasVendor = false;
    private templateSelect: FormTemplateSelectSearchService;

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

    ngOnInit() {
        this.generalInformation = this.fb.group({
            driverPhoto: ['', Validators.required],
            driverName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            bloodGroup: ['a+', Validators.required],
            nid: ['', Validators.required],
            nidImageFront: [''],
            nidImageBack: [''],
            typeOfContact: [''],
        });
        this.userInformation = this.fb.group({
            driveFor: [this.departments[0] ? this.departments[0].id : '', Validators.required],
            role: ['', Validators.required],
            licenseNumber: ['', Validators.required],
            licenseEndDate: ['', Validators.required],
            licenseClass: ['heavy', Validators.required],
            licenseUpload: ['', Validators.required],
            vehicle: ['']
        });
        this.contactInformation = this.fb.group({
            phoneNumber: ['', Validators.required],
            address: ['', Validators.required],
            has_vendor: 0,
        });
    }

    setData(data) {
        this.departments = data.departments ? data.departments : [];
        this.roles = this.departments[0] ? this.departments[0].roles : [];

        this.vehicles = data.vehicles as any[];
        this.vendors = data.vendors as any[];
    }


    submitDriver() {
        this.showContactInformationError = true;

        const generalData = this.generalInformation.getRawValue();
        const userData = this.userInformation.getRawValue();
        const contactData = this.contactInformation.getRawValue();

        if (contactData.phoneNumber && contactData.address) {
            const submitData = {
                pro_pic: generalData.driverPhoto,
                name: generalData.driverName,
                dob: this.getApiFormat(generalData.dateOfBirth),
                nid_no: generalData.nid,
                nid_image_front: generalData.nidImageFront,
                nid_image_back: generalData.nidImageBack,

                department_id: userData.driveFor,
                role_id: userData.role,
                license_number: userData.licenseNumber,
                license_number_end_date: this.getApiFormat(userData.licenseEndDate),
                license_class: userData.licenseClass,
                license_number_image: userData.licenseUpload,
                vehicle_id: userData.vehicle,

                mobile: contactData.phoneNumber,
                address: contactData.address,
            };
            if (this.contactInformation.get('has_vendor').value) {
                submitData['vendor_id'] = this.contactInformation.get('vendor_id').value;
            }

            this.submittingDriver = true;
            this.http.postWithFiles('/v2/members/' + this.storage.user.member_id + '/drivers', submitData).toPromise().then(res => {
                this.submittingDriver = false;
                console.log(res);
                if (res.code === 200) {
                    this.driverId = res.driver;
                    this.showConfirmation = true;
                    this.confirmType = 'success';
                    this.confirmTitle = 'Request Successful!';
                    this.confirmMesssage = res.message || 'driver Added successfully';
                } else {
                    // this.showConfirmation = true;
                    // this.confirmType = 'failure';
                    // this.confirmTitle = 'Request Failed';
                    // this.confirmMessage = res.message;
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.submittingDriver = false;
                this.showConfirmation = true;
                this.confirmType = 'failure';
                this.confirmTitle = 'Request Failed';
                this.confirmMesssage = err.message;
            });
        }
    }

    updateRoles() {
        const department = this.userInformation.getRawValue().driveFor;
        const selectedDepartment = this.departments.find( dept => dept.id == department);

        this.roles = selectedDepartment ? selectedDepartment.roles : [];
    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    }

    viewDetails() {
        this.router.navigate(['/', 'dashboard', 'fleet-management', 'drivers', this.driverId, 'info']).catch(err => {
            console.log(err);
        });
    }

    dateOfBirthFilter = (d: Date): boolean => {
        const today = new Date();

        return (d < today) && (d !== today);
    }

    hasVendorChange() {
        const val = this.contactInformation.get('has_vendor').value;
        if (val) {
            this.hasVendor = true;
            this.contactInformation.addControl('vendor_id', new FormControl(null, [Validators.required]));
        } else {
            this.hasVendor = false;
            this.contactInformation.removeControl('vendor_id');
        }
    }

    showFormTemplateSelect(item: any) {
        let ref: MatDialogRef<FormTemplateSelectSearchComponent>;
        if (this.vendors.length) {
            ref = this.templateSelect.open({selectedItem: this.vendors[0]});
        } else {
            ref = this.templateSelect.open({selectedItem: null});
        }
        ref.afterClosed().subscribe(res => {
            if (res) {
                this.vendors[0] = res;
                this.contactInformation.get('vendor_id').setValue(res.id);
            }
            item.close();
        });
    }

}
