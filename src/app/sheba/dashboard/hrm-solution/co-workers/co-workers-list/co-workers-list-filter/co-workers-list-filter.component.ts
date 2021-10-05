import { Component, OnInit, OnChanges, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IDepartment, IEmployee } from 'src/app/types/users';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../modals/dialog-confirm/dialog-confirm.component';
import { CoWorkersListService } from '../../co-workers-services/co-workers-list.service';

@Component({
  selector: 'app-co-workers-list-filter',
  templateUrl: './co-workers-list-filter.component.html',
  styleUrls: ['./co-workers-list-filter.component.scss']
})
export class CoWorkersListFilterComponent implements OnInit, OnChanges {

    bulkActionOptions = {
        invite: 'invited',
        deactivate: 'deactivate',
        activate: 'activate'
    };

    @Input() departments: IDepartment[];
    @Input() filteredEmployees: IEmployee[];
    @Input() selectedRow: any[] = [];
    @Input() totalCoWorkerCount: number;
    @Input() limit: number;
    @Input() dataOffset: number;
    @Input() currentLength: number;
    @Input() sort: {name: string, type: string};
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter<any>();
    filter: any;
    marginTop = true;
    constructor(
                public dialog: MatDialog,
                private coWorkerListService: CoWorkersListService) {
        this.filter = {
            status: null,
            department: null,
            search: null,
            sort: null,
            page: 0,
            action: null
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
       if (changes.sort && changes.sort.currentValue !== undefined) {
            this.sortTable(changes.sort.currentValue.type, changes.sort.currentValue.name);
        }
    }

    ngOnInit() { }

    selectDepartment(selectedDepartment: any) {
        this.filter.department = selectedDepartment.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectStatus(selectedStatus: any) {
        this.filter.status = selectedStatus.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    sortTable(currentSortType, currentSortColumn) {
        this.filter.sort_type = currentSortType;
        this.filter.sort_column = currentSortColumn;
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
        return this.totalCoWorkerCount > this.filter.page + this.limit;
    }

    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }

    // Bulk Action
    selectAction(actionType: any) {
        if (actionType.value === 'activate') { this.showActivateDialog(); }
        if (actionType.value === 'deactivate') { this.showDeactivateDialog(); }
        if (actionType.value === 'invite') { this.showInvitedDialog(); }
    }

    showActivateDialog() {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '540px',
            height: '380px',
            data: {
                message: 'Are you sure you want to activate these co-workers?',
                icon: '/assets/svg/confirm.svg',
                button_1: 'No',
                button_2: 'Yes',
                type: 'Confirm'
            }
          });

        dialogRef.afterClosed().subscribe(result => {
             if (result) {
                this.getCoworkerRequestsStatusResponse('active');
             }
          });
    }

    showDeactivateDialog() {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '540px',
            height: '380px',
            data: {
                message: 'Are you sure you want to deactivate these co-workers?',
                icon: '/assets/svg/confirm.svg',
                button_1: 'No',
                button_2: 'Yes',
                type: 'Confirm'
            }
          });

        dialogRef.afterClosed().subscribe(result => {
             if (result) {
                this.getCoworkerRequestsStatusResponse('inactive');
             }
          });
    }
    showInvitedDialog() {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            width: '540px',
            height: '380px',
            data: {
                message: 'Are you sure you want to invite these co-workers?',
                icon: '/assets/svg/confirm.svg',
                button_1: 'No',
                button_2: 'Yes',
                type: 'Confirm'
            }
          });

        dialogRef.afterClosed().subscribe(result => {
             if (result) {
                this.getCoworkerRequestsStatusResponse('invited');
             }
          });
    }

    getCoworkerRequestsStatusResponse(status) {
        const filteredRequests = this.selectedRow.reduce((filtered, item) => {
                const someNewValue = item.id;
                filtered.push(someNewValue);
                return filtered;
        }, []);
        const data = {
            employee_ids : JSON.stringify(filteredRequests),
            status
        };
        this.coWorkerListService.activeOrInactiveOrInviteRequests(data).subscribe(res => {
            this.filter.action = status;
            this.filterEmitter.emit(this.filter);
            document.getElementById('success-message').style.display = 'block';
            this.marginTop = false;
        });
    }

    hideMessage() {
        document.getElementById('success-message').style.display = 'none';
        this.marginTop = true;

    }

}
