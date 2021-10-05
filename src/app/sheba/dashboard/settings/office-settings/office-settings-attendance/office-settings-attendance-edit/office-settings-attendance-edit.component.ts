import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Breadcrumb, ETable} from '../../../../../../types/general';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {TableDataSource, ValidatorService} from 'angular4-material-table';
import {BusinessOfficesEditValidatorService} from '../../services/business-offices-edit-validator.service';
import {BusinessOffices} from '../../types/business-offices';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-office-settings-attendance-edit',
    templateUrl: './office-settings-attendance-edit.component.html',
    styleUrls: ['./office-settings-attendance-edit.component.scss'],
    providers: [
        {provide: ValidatorService, useClass: BusinessOfficesEditValidatorService}
    ]
})
export class OfficeSettingsAttendanceEditComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() businessOfficeList = [];
    @Output() businessOfficeListChange = new EventEmitter<BusinessOffices[]>();
    @ViewChild('addNewRow') addNewRow: ElementRef<HTMLElement>;

    sheba_attendance_types: any;
    business_attendance_types: any;
    deleted_attendance_types: any = [];
    new_attendance_types: any = [];
    new_checked_types: any = [];
    show_ip_list = false;
    existing_types = [];
    edited_business_offices: any = [];
    added_business_offices: any = [];
    final_business_offices: any = [];
    deleted_business_offices: any = [];
    error_message;
    tableData: ETable[] = [
        {
            label: 'Name',
            value: 'officeName',
            type: 'text',
            increment: 'false'
        },
        {
            label: 'IP',
            value: 'officeIp',
            type: 'text',
            increment: 'false'
        },
        {
            label: '',
            value: 'actionsColumn',
            type: '',
            increment: 'false'
        }
    ];
    breadcrumb: Breadcrumb[] = [
        {
            title: 'Settings',
            path: '/dashboard/settings'
        },
        {
            title: 'Office Settings',
            path: '/dashboard/settings/office/attendance'
        },
        {
            title: 'Edit',
            isActive: true
        }
    ];
    dataSource: TableDataSource<BusinessOffices>;

    displayedColumns: ETable[];
    displayColumns: string[] = [];
    inEditMode: boolean[] = [];
    showAddNewRowButton = true;
    showAddAnotherText = false;

    constructor(private dashboardSharedService: DashboardSharedService,
                private route: ActivatedRoute,
                private businessOfficeValidator: ValidatorService,
                private pop: PopAlertService,
                private http: ShebaHttpService,
                private storage: StorageService,
                private router: Router,
                private dialog: MatDialog,
                private cdRef: ChangeDetectorRef) {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.route.data.subscribe(({officeAttendanceSettingResolver}) => {
            console.log(officeAttendanceSettingResolver[0]);
            const attendance_info = officeAttendanceSettingResolver[0];
            this.sheba_attendance_types = attendance_info.sheba_attendance_types;
            this.setExistingTypes(attendance_info.business_attendance_types);
            this.setBusinessOffices(attendance_info.business_offices);
            this.setShowAddAnother();
        });
    }

    ngOnInit() {
        this.displayedColumns = this.tableData;
        this.dataSource = new TableDataSource<any>(this.businessOfficeList, ETable, this.businessOfficeValidator);
        this.dataSource.datasourceSubject.subscribe(businessOfficeList => this.businessOfficeListChange.emit(businessOfficeList));
        this.displayColumns = this.displayedColumns.map(res => res.value);
    }

    ngAfterViewInit(): void {
        // if (this.businessOfficeList && this.businessOfficeList.length === 0) {
        //     this.autoAddNewRow();
        // }
    }

    // autoAddNewRow() {
    //     this.inEditMode[0] = true;
    //     const el: HTMLElement = this.addNewRow.nativeElement;
    //     el.click();
    //     this.cdRef.detectChanges();
    // }

    setExistingTypes(types) {
        this.business_attendance_types = types;
        types.forEach((type) => {
            if (type.status === 'not_deleted') {
                this.existing_types.push(type.type);
            } else if (type.status === 'deleted') {
                this.deleted_attendance_types.push(type.type);
            }
        });
        if (this.existing_types.includes('ip_based')) {
            this.show_ip_list = true;
        }
        this.existing_types.forEach((exist) => {
            this.new_checked_types.push(exist);
        });
    }

    setBusinessOffices(offices) {
        this.businessOfficeList = offices.map(res => {
            return {
                id: res.id,
                officeName: res.office_name,
                officeIp: res.ip
            };
        });
    }


    setShowAddAnother() {
        if (this.businessOfficeList.length) {
            this.showAddAnotherText = true;
        }
    }

    confirmRow(row, index) {
        if (row.validator.status === 'VALID') {
            if (this.validateIpAddress(row.currentData.officeIp)) {
                if (row.currentData.id !== null) {
                    this.editBusinessOffice(row.currentData);
                }
                if (row.currentData.id === null) {
                    this.addBusinessOffice(row.currentData, row.originalData);
                }
                this.inEditMode[index] = false;
                this.showAddNewRowButton = true;
                this.showAddAnotherText = true;
                row.confirmEditCreate();
            } else {
                this.pop.open('Please Give Valid Ip Address');
            }
        } else {
            this.pop.open('Please fill in all the forms');
        }
    }

    validateIpAddress(ip) {
        return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
        // for port
        // /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)   (?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?  $/;
    }

    editBusinessOffice(currentdata) {
        // if edit a row which was edited before than delete previous data and insert new data
        this.editAgainSameRow(currentdata);
        const edit_obj = this.formatPushData(currentdata, 'edit');
        this.edited_business_offices.push(edit_obj);
    }

    addBusinessOffice(currentdata, originaldata) {
        // user trying to edit an added row with different data so remove previous added data and insert new data
        this.editExistingAddedRow(originaldata);
        const add_obj = {
            name: currentdata.officeName,
            ip: currentdata.officeIp,
            action: 'add'
        };
        this.added_business_offices.push(add_obj);
    }

    editAgainSameRow(currentdata) {
        let edit_same_id = false;
        let duplicate_edit_index = 0;
        this.edited_business_offices.forEach((office, index) => {
            if (office.id === currentdata.id) {
                edit_same_id = true;
                duplicate_edit_index = index;
            }
        });
        if (edit_same_id) {
            this.edited_business_offices.splice(duplicate_edit_index, 1);
        }
    }

    editExistingAddedRow(originaldata) {
        let edit_added_id = false;
        let duplicate_add_index = 0;
        const original_data = originaldata;
        this.added_business_offices.forEach((office, index) => {
            if (original_data) {
                if (office.name === original_data.officeName && office.ip === original_data.officeIp) {
                    edit_added_id = true;
                    duplicate_add_index = index;
                }
            }
        });
        if (edit_added_id) {
            this.added_business_offices.splice(duplicate_add_index, 1);
        }
    }

    formatPushData(data, action) {
        return {
            id: data.id,
            name: data.officeName,
            ip: data.officeIp,
            action
        };
    }


    editRow(row, index) {
        this.inEditMode[index] = true;
        row.startEdit();
        this.showAddNewRowButton = false;
    }

    deleteRow(row, index) {
        if (row.editing === true) {
            this.showAddNewRowButton = true;
            row.cancelOrDelete();
            this.inEditMode[index] = false;
            return;
        } else {
            row.cancelOrDelete();
        }
        if (row.currentData.id !== null) {
            this.deleteIpWithId(row.currentData);
        }
        if (row.currentData.id === null) {
            this.deleteIpWithoutId(row.currentData);
        }
    }

    deleteIpWithId(currendata) {
        const delete_obj = this.formatPushData(currendata, 'delete');
        this.deleted_business_offices.push(delete_obj);
    }

    deleteIpWithoutId(currendata) {
        // deleting added data
        let index_to_be_deleted = 0;
        let deleted_data_exists_in_add = false;
        this.added_business_offices.forEach((office, index) => {
            if (office.name === currendata.officeName && office.ip === currendata.officeIp) {
                index_to_be_deleted = index;
                deleted_data_exists_in_add = true;
            }
            if (deleted_data_exists_in_add) {
                this.added_business_offices.splice(index_to_be_deleted, 1);
            }
        });
    }

    createNewRow(dataSource) {
        this.showAddNewRowButton = false;
        dataSource.createNew();
        if (dataSource.currentData) {
            this.inEditMode[dataSource.currentData.length] = true;
        } else {
            this.inEditMode[this.businessOfficeList.length] = true;
        }
    }

    submit() {
        if (this.new_checked_types.length) {
            this.constructTypeData();
            if (this.new_checked_types.includes('ip_based')) {
                const duplicate_exits = this.validateBusinessOffices();
                if (duplicate_exits) {
                    this.error_message = 'Duplicate Ip\'s Found! Please Provide Unique Ip\'s.';
                    this.openErrorModal();
                } else {
                    const api_data = this.constructApiData();
                    this.postToApi(api_data);
                }
            } else {
                const api_data = this.typeRemoteApiData();
                this.postToApi(api_data);
            }
            this.new_attendance_types = [];
        } else {
            this.error_message = 'Fill At Least One Attendance Type';
            this.openErrorModal();
        }
    }

    constructApiData() {
        return {
            attendance_types: JSON.stringify(this.new_attendance_types),
            business_offices: JSON.stringify(this.final_business_offices)
        };
    }

    typeRemoteApiData() {
        return {
            attendance_types: JSON.stringify(this.new_attendance_types),
            business_offices: '[]'
        };
    }

    postToApi(api_data) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/attendance-setting/update', api_data).toPromise().then(res => {
            if (res.code === 200) {
                this.router.navigate(['/', 'dashboard', 'settings', 'office', 'attendance'], {state: {alertSuccess: true}}).catch(err => {
                });
            } else if (res.code === 303) {
                this.router.navigate(['/', 'dashboard', 'settings', 'office', 'attendance'], {state: {alertWarning: true}}).catch(err => {
                });
            } else {
                this.error_message = 'Something went terribly wrong! Please, try again later!';
                this.openErrorModal();
            }
        });
    }

    validateBusinessOffices() {
        const noOperationRows = this.separateUntouchedRows();
        let check_unique_rows = [];
        const ips = [];
        let unique_ips = [];
        let is_duplicate = false;

        check_unique_rows = this.edited_business_offices.concat(this.added_business_offices).concat(noOperationRows);
        check_unique_rows.forEach((office) => {
            ips.push(office.ip);
        });
        unique_ips = ips.filter((item, i, ar) => ar.indexOf(item) === i);
        if (ips.length !== unique_ips.length) {
            is_duplicate = true;
        }
        this.final_business_offices = this.edited_business_offices.concat(this.added_business_offices).concat(this.deleted_business_offices);
        return is_duplicate;
    }

    separateUntouchedRows() {
        const rowsWithoutDelete = [];
        const rowsWithoutEdit = [];
        this.businessOfficeList.forEach((office) => {
            if (this.deleted_business_offices.filter(e => e.id === office.id).length === 0) {
                const data_not_deleted = this.reformatData(office);
                rowsWithoutDelete.push(data_not_deleted);
            }
        });
        rowsWithoutDelete.forEach((office) => {
            if (this.edited_business_offices.filter(e => e.id === office.id).length === 0) {
                rowsWithoutEdit.push(office);
            }
        });

        return rowsWithoutEdit;
    }

    reformatData(data) {
        return {
            id: data.id,
            name: data.officeName,
            ip: data.officeIp
        };
    }

    onCheckChange($event: MatCheckboxChange) {
        if ($event.source.value === 'ip_based') {
            this.show_ip_list = $event.checked;
        }
        if (!this.new_checked_types.includes($event.source.value)) {
            this.new_checked_types.push($event.source.value);
        } else {
            const index = this.new_checked_types.indexOf($event.source.value);
            if (index > -1) {
                this.new_checked_types.splice(index, 1);
            }
        }
    }

    constructTypeData() {
        const types = ['remote', 'ip_based'];
        types.forEach((type) => {
            if (this.new_checked_types.includes(type)) {
                this.setNewAttendanceTypes(type, 'checked');
            } else {
                this.setNewAttendanceTypes(type, 'unchecked');
            }
        });
    }

    setNewAttendanceTypes(type, status) {
        if (this.existing_types.includes(type)) {
            this.business_attendance_types.forEach((business_type) => {
                if (business_type.type === type) {
                    const obj_data = {
                        id: business_type.id,
                        type: business_type.type,
                        action: status
                    };
                    this.new_attendance_types.push(obj_data);
                }
            });
        } else if (this.deleted_attendance_types.includes(type)) {
            this.business_attendance_types.forEach((business_type) => {
                if (business_type.type === type) {
                    const obj_data = {
                        id: business_type.id,
                        type: business_type.type,
                        action: status
                    };
                    this.new_attendance_types.push(obj_data);
                }
            });
        } else {
            const obj_data = {
                type,
                action: status
            };
            this.new_attendance_types.push(obj_data);
        }
    }

    openErrorModal() {
        const data = {
            type: 'failure',
            title: 'Error Message',
            text: this.error_message,
            actionText: 'Close'
        };

        this.dialog.open(ConfirmModalComponent, {
            data,
            width: '540px',
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }
}
