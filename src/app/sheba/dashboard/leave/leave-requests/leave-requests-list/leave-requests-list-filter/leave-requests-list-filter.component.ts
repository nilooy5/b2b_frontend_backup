import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import Swal from 'sweetalert2';
import {LeaveService} from '../../../leave-services/leave.service';
import {Observable} from 'rxjs';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {log} from 'util';
import {IDepartment, IEmployee} from '../../../../../../types/users';
import {MatDialog} from '@angular/material';
import {ConfirmDeclineModalComponent} from '../../modals/confirm-decline-modal/confirm-decline-modal.component';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';


interface ISweetAlert {
    alertText: string;
    confirmBtnColor: string;
    leaveStatus: string;
    confirmMessage: string;
}


@Component({
    selector: 'app-leave-requests-list-filter',
    templateUrl: './leave-requests-list-filter.component.html',
    styleUrls: ['./leave-requests-list-filter.component.scss']
})

export class LeaveRequestsListFilterComponent implements OnInit, OnChanges {

    bulkActionOptions = {
        approve: 'Approve All',
        reject: 'Reject All'
    };

    @Input() departments: IDepartment[];
    @Input() filteredEmployees: IEmployee[];
    @Input() selectedRow: any[] = [];
    @Input() totalLeaveRequestsCount: number;
    @Input() limit: number;
    @Input() dataOffset: number;
    @Input() currentLength: number;
    @Input() sortType: string;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter<any>();
    filter: any;
    confirmationDialogRef;
    showSuccessAlert = false;
    alert_message;

    constructor(private leaveService: LeaveService,
                private dialog: MatDialog) {
        this.filter = {
            status: null,
            department: null,
            employee: null,
            search: null,
            sort: this.sortType,
            page: 0
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.sortType && changes.sortType.currentValue !== undefined) {
            this.sortTable(changes.sortType.currentValue);
        }
    }

    ngOnInit() { }

    selectDepartment(selectedDepartment: Event) {
        this.filter.department = selectedDepartment;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectEmployee(selectedEmployee: Event) {
        this.filter.employee = selectedEmployee;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectStatus(selectedStatus: Event) {
        this.filter.status = selectedStatus;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    sortTable(currentSortType) {
        this.filter.sort = currentSortType;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    search(input: Event) {
        const target = input.target as HTMLInputElement;
        this.filter.search = target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }
    previousPage() {
        if (this.isPreviousPageUnavailable()) { return; }
        this.filter.page -= this.limit;
        this.filterEmitter.emit(this.filter);
    }

    nextPage() {
        if (this.isNextPageUnavailable()) { return; }
        this.filter.page += this.limit;
        this.filterEmitter.emit(this.filter);
    }

    isPreviousPageUnavailable() {
        return this.filter.page <= 1;
    }

    isNextPageAvailable() {
        return this.totalLeaveRequestsCount > this.filter.page + this.limit;
    }

    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }

    // Bulk Action
    selectAction(actionType: Event) {
        const target = actionType.target as HTMLSelectElement;
        // if (target.value === 'approve') { this.showApproveDialog(); }
        // if (target.value === 'reject') { this.showRejectDialog(); }
        if (target.value === 'approve') { this.openConfirmModal('accepted'); }
        if (target.value === 'reject') { this.openConfirmModal('rejected'); }
    }

    openConfirmModal(status) {
        const data = {
            type: 'confirm',
            title: 'Confirm',
            text: 'Confirm to take the bulk action for the selected leaves?',
            actionTextOne: 'No',
            actionTextTwo: 'Yes'
        };

        this.confirmationDialogRef = this.dialog.open( ConfirmDeclineModalComponent, {
            data,
            width: '540px',
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });

        this.dialogButtonActions(status);
    }

    dialogButtonActions(status) {
        const dialogSubscription = this.confirmationDialogRef.componentInstance.onConfirmOrError.subscribe((type) => {
            if (type === 'yes') {
                const value = status === 'accepted' ? 'approved' : 'rejected';
                const message = 'Leave requests has been ' + value + ' successfully';
                this.getLeaveRequestsStatusResponse(status).then((response) => {
                    this.handleLeaveRequestsResponse(response, message);
                });
            }
            this.confirmationDialogRef.close();
        });
        this.confirmationDialogRef.afterClosed().subscribe(() => dialogSubscription.unsubscribe());
    }

    openErrorModal() {
        const data = {
            type: 'failure',
            title: 'Error Message',
            text: 'Something went terribly wrong! Please, try again later! ',
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

    initiateAgain() {
        this.showSuccessAlert = false;
    }

    showApproveDialog() {
        const alertObject: ISweetAlert = {
            alertText: 'Are you sure you want approve the selected request',
            confirmBtnColor: '#2ba660',
            leaveStatus: 'accepted',
            confirmMessage: 'Leave requests has been approved successfully'
        };
        this.constructSweetAlert(alertObject);
    }

    showRejectDialog() {
        const alertObject: ISweetAlert = {
            alertText: 'Are you sure you want reject the selected request?',
            confirmBtnColor: '#fa5252',
            leaveStatus: 'rejected',
            confirmMessage: 'Leave requests has been rejected successfully'
        };
        this.constructSweetAlert(alertObject);
    }

    constructSweetAlert(constructedAlertObject: ISweetAlert) {
        Swal.fire({
            title: 'Are you sure?',
            text: constructedAlertObject.alertText,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: constructedAlertObject.confirmBtnColor,
            cancelButtonColor: '#437ff5',
            confirmButtonText: 'Confirm',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => this.getLeaveRequestsStatusResponse(constructedAlertObject.leaveStatus),
        }).then((response) => {
            this.handleLeaveRequestsResponse(response, constructedAlertObject.confirmMessage);
        });
    }

    getLeaveRequestsStatusResponse(status) {
        const filteredRequests = this.selectedRow.reduce((filtered, item) => {
            if (item.leaveStatus.label === 'Pending') {
                const someNewValue = item.leaveRequestId;
                filtered.push(someNewValue);
            }
            return filtered;
        }, []);
        const data = {
            type_id: JSON.stringify(filteredRequests),
            status
        };
        return this.leaveService.approveOrRejectLeaveRequest(data);
    }

    handleLeaveRequestsResponse(response, message?) {
        if (response.code !== 200) {
            this.openErrorModal();
            return;
        }
        // this.successfulAlert(message);
        this.alert_message = message;
        this.showSuccessAlert = true;
        this.filterEmitter.emit(this.filter);
    }

    successfulAlert(message) {
        Swal.fire(
            'Success',
            message,
            'success'
        ).then();
    }

    errorAlert() {
        Swal.fire(
            'Error',
            'Something went wrong. Please try again',
            'error'
        ).then();
    }


}
