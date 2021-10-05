import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableDataSource, ValidatorService} from 'angular4-material-table';
import {LeaveTypeValidatorService} from '../services/leave-type-validator.service';
import {LeaveType} from '../types/leave-type';
import {ActivatedRoute} from '@angular/router';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {LeaveTypesResolverService} from '../services/leave-types-resolver.service';
import {NotifyModalComponent} from '../modals/notify-modal/notify-modal.component';
import {MatDialog} from '@angular/material';
import {LoadingModalComponent} from '../../../../modals/loading-modal/loading-modal.component';

@Component({
    selector: 'app-leave-settings-type',
    templateUrl: './leave-settings-type.component.html',
    styleUrls: ['./leave-settings-type.component.scss'],
    providers: [
        {provide: ValidatorService, useClass: LeaveTypeValidatorService}
    ]
})

export class LeaveSettingsTypeComponent implements OnInit, AfterViewInit {

    @Input() leaveTypeList = [];
    @Output() leaveTypeListChange = new EventEmitter<LeaveType[]>();
    @ViewChild('addNewRow') addNewRow: ElementRef<HTMLElement>;
    disableAddRow = false;
    submissionType: string;
    filteredLeaveTypeList: any;
    isChecked: boolean;
    inEditMode: boolean[] = [];
    total_records = 0;
    showSuccessAlert = false;
    search_text: string;
    alert_message;
    show_leave_types = false;

    dataSource: TableDataSource<LeaveType>;

    displayColumns = ['serialNo', 'typeName', 'totalDays', 'actionsColumn'];
    confirmationDialogRef;
    loadingDialogRef;

    constructor(private leaveTypeValidator: ValidatorService,
                private activatedRoute: ActivatedRoute,
                private pop: PopAlertService,
                private leaveTypesService: LeaveTypesResolverService,
                private dialog: MatDialog,
                private cdRef: ChangeDetectorRef) {
        activatedRoute.data.subscribe(({leaveTypesListResolver: leaveTypes}) => {
            this.receivedLeaveTypes(leaveTypes);
            this.setVisibility();
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        // if (this.leaveTypeList && this.leaveTypeList.length === 0) {
        //     this.autoAddNewRow();
        // }
    }

    // autoAddNewRow() {
    //     const el: HTMLElement = this.addNewRow.nativeElement;
    //     el.click();
    //     this.cdRef.detectChanges();
    // }

    setVisibility() {
        if (this.leaveTypeList.length > 0) {
            this.show_leave_types = true;
        }
    }

    receivedLeaveTypes(leaveTypesList) {
        this.leaveTypeList = leaveTypesList.map(res => {
            return {
                id: res.id,
                typeName: res.title,
                totalDays: res.total_days
            };
        });
        this.dataSource = new TableDataSource<any>(this.leaveTypeList, LeaveType, this.leaveTypeValidator);
        this.dataSource.datasourceSubject.subscribe(leaveTypeList => this.leaveTypeListChange.emit(leaveTypeList));
        this.total_records = this.leaveTypeList.length;
        if (!this.leaveTypeList.length) {
            this.show_leave_types = false;
            this.showSuccessAlert = false;
        }
    }

    search(key) {
        const search = key.target.value;
        this.filteredLeaveTypeList = this.leaveTypeList.filter(item => {
            return item.typeName.toLowerCase().includes(search.toLowerCase());
        });
        this.dataSource = new TableDataSource<any>(this.filteredLeaveTypeList, LeaveType, this.leaveTypeValidator);
        this.total_records = this.filteredLeaveTypeList.length;
    }

    addRow(dataSource) {
        this.disableAddRow = true;
        this.submissionType = 'store';
        dataSource.createNew();
        if (dataSource.currentData) {
            this.inEditMode[dataSource.currentData.length] = true;
        } else {
            this.inEditMode[this.leaveTypeList.length] = true;
        }
        if (!this.show_leave_types) {
            this.show_leave_types = true;
        }
    }

    confirmRow(row, index) {
        if (row.validator.status === 'VALID') {
            if (row.currentData.id === null) {
                this.addLeaveType(row, index);
            }

            if (row.currentData.id !== null) {
                this.updateLeaveType(row, index);
            }
        } else {
            this.pop.open('Please Fill All Fields Correctly !');
        }
    }

    addLeaveType(row, index) {
        this.openLoadingModal('Creating');
        this.leaveTypesService.createLeaveType(row.currentData).subscribe((response) => {
            this.loadingDialogRef.close();
            if (response.code === 200) {
                row.confirmEditCreate();
                this.inEditMode[index] = false;
                this.getLatestLeaveTypes();
                this.alert_message = 'A New Leave Type Added successfully !';
                this.commonTasksAfterSuccess();
            } else {
                this.openNotifyModal(row, index, 'error', 'add');
            }
        }, (error) => this.openNotifyModal(row, index, 'error', 'add'));
    }

    updateLeaveType(row, index) {
        const previousData = JSON.stringify(row.originalData);
        const currentData = JSON.stringify(row.currentData);

        if (previousData !== currentData) {
            this.openLoadingModal('Updating');
            this.leaveTypesService.updateLeaveType(row.currentData).subscribe((response) => {
                this.loadingDialogRef.close();
                if (response.code === 200) {
                    row.confirmEditCreate();
                    this.inEditMode[index] = false;
                    this.getLatestLeaveTypes();
                    this.alert_message = 'Leave Type Updated successfully !';
                    this.commonTasksAfterSuccess();
                } else {
                    this.openNotifyModal(row, index, 'error', 'edit');
                }
            }, (error) => {
                this.openNotifyModal(row, index, 'error', 'edit');
            });
        }
        this.inEditMode[index] = false;
        this.disableAddRow = false;
        row.confirmEditCreate();
    }

    editRow(row, index) {
        row.startEdit();
        this.submissionType = 'update';
        this.disableAddRow = true;
        this.inEditMode[index] = true;
    }

    deleteRow(row, index) {
        /* When in edit mode*/
        if (row.editing === true) {
            this.disableAddRow = false;
            this.inEditMode[index] = false;
            row.cancelOrDelete();
            return;
        } else {
            if (row.currentData.id !== null) {
                this.openNotifyModal(row, index, 'confirm', 'delete');
            }
        }
    }

    initiateAgain() {
        this.showSuccessAlert = false;
    }

    postToApiDelete(row, index) {
        this.leaveTypesService.deleteLeaveType(row.currentData.id).subscribe(res => {
            if (res.code === 200) {
                row.cancelOrDelete();
                this.getLatestLeaveTypes();
                this.alert_message = 'Leave Type Deleted successfully !';
                this.commonTasksAfterSuccess();
            } else {
                this.openNotifyModal(row, index, 'error', 'delete');
            }
        }, (error) => {
            this.openNotifyModal(row, index, 'error', 'delete');
        });
    }

    getLatestLeaveTypes() {
        this.leaveTypesService.getLeaveTypes().subscribe(res => {
            if (res.code === 200) {
                this.receivedLeaveTypes(res.leave_types);
            }
        }, (error) => {
            this.pop.open(error.message);
        });
    }

    commonTasksAfterSuccess() {
        this.showSuccessAlert = true;
        this.disableAddRow = false;
        this.search_text = '';
    }

    openNotifyModal(row, index, type, action) {
        const data = {
            type: type === 'error' ? 'failure' : 'confirm',
            title: type === 'error' ? 'This is a error message' : 'Wait!',
            text: type === 'error' ? 'Something went terribly wrong! Please, try again later! ' : 'Are you sure you want to delete this leave type?',
            actionTextOne: type === 'error' ? 'Try Again' : 'No',
            actionTextTwo: type === 'error' ? 'Close' : 'Yes'
        };

        this.confirmationDialogRef = this.dialog.open(NotifyModalComponent, {
            data,
            width: '540px',
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });

        this.dialogButtonActions(row, index, action);
    }

    dialogButtonActions(row, index, action) {
        const dialogSubscription = this.confirmationDialogRef.componentInstance.onConfirmOrError.subscribe((type) => {
            if (type === 'yes') {
                this.postToApiDelete(row, index);
            }
            if (type === 'try-again') {
                if (action === 'add') {
                    this.addLeaveType(row, index);
                } else if (action === 'edit') {
                    this.updateLeaveType(row, index);
                } else if (action === 'delete') {
                    this.postToApiDelete(row, index);
                }
            }
            this.confirmationDialogRef.close();
        });

        this.confirmationDialogRef.afterClosed().subscribe(() => dialogSubscription.unsubscribe());
    }

    handleNewRow(dataSource) {
        this.disableAddRow = true;
        dataSource.createNew();
        if (dataSource.currentData) {
            this.inEditMode[dataSource.currentData.length] = true;
        } else {
            this.inEditMode[this.leaveTypeList.length] = true;
        }
    }

    openLoadingModal(message) {
        let data: { image: string, title: string, text: string };

        data = {
            image: 'assets/svg/hourglass.svg',
            title: 'Leave Type is ' + message,
            text: 'Please wait few moments.'
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
