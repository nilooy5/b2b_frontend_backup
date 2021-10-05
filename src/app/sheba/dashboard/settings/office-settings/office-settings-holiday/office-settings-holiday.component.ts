import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Breadcrumb, ETable} from '../../../../../types/general';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {TableDataSource, ValidatorService} from 'angular4-material-table';
import {HolidayValidatorService} from '../services/holiday-validator.service';
import {ActivatedRoute} from '@angular/router';
import {Holidays} from '../types/holiday';
import * as moment from 'moment';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {MatDialog} from '@angular/material';
import {ConfirmDeleteModalComponent} from '../../../../modals/confirm-delete-modal/confirm-delete-modal.component';
import {ConfirmModalComponent} from '../../../../modals/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-office-settings-holiday',
    templateUrl: './office-settings-holiday.component.html',
    styleUrls: ['./office-settings-holiday.component.scss'],
    providers: [
        {provide: ValidatorService, useClass: HolidayValidatorService}
    ]
})

export class OfficeSettingsHolidayComponent implements OnInit {
    @Input() holidayList = [];
    @Output() holidayListChange = new EventEmitter<Holidays[]>();

    sort_holiday: any = [
        {sort_column: 'sort_on_date', sort_type: 'asc'},
        {sort_column: 'sort_on_days', sort_type: 'asc'},
        {sort_column: 'sort_on_name', sort_type: 'asc'},
    ];
    filter: any = {
        search: '',
        sort_column: null,
        sort_type: null,
    };
    inEditMode: boolean[] = [];
    total_records = 0;
    track_changes_edit: any = [];
    track_changes_add: any = [];
    showSuccessAlert = false;
    search_text: string;
    alert_message;
    disableAddRow = false;
    dataSource: TableDataSource<Holidays>;
    displayColumns = ['start_date', 'total_days', 'name', 'actionsColumn'];
    confirmationDialogRef;

    constructor(private dashboardSharedService: DashboardSharedService,
                private route: ActivatedRoute,
                private holidayValidator: ValidatorService,
                private http: ShebaHttpService,
                private storage: StorageService,
                private pop: PopAlertService,
                private dialog: MatDialog) {
        this.route.data.subscribe(res => {
            this.setHolidayList(res.holidayList.business_holidays);
        });
    }

    ngOnInit() {
    }

    setHolidayList(holidays) {
        this.holidayList = holidays.map(res => {
            return {
                id: res.id,
                start_date: res.start_date,
                end_date: res.end_date,
                date: res.date,
                total_days: res.total_days,
                name: res.name
            };
        });
        this.dataSource = new TableDataSource<any>(this.holidayList, Holidays, this.holidayValidator);
        this.dataSource.datasourceSubject.subscribe(holidaylist => this.holidayListChange.emit(holidaylist));
        this.total_records = this.holidayList.length;
    }

    search(event) {
        this.filter.search = event.target.value;
        this.filterHoliday();
    }

    sort(property) {
        this.sort_holiday.forEach((status) => {
            if (status.sort_column === property) {
                this.filter.sort_column = status.sort_column;
                this.filter.sort_type = status.sort_type;
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
                this.filterHoliday();
            }
        });
    }

    filterHoliday() {
        const filterParams = {};
        filterParams['search'] = this.filter.search;
        filterParams[this.filter.sort_column] = this.filter.sort_type;
        this.getFilteredHolidays(filterParams);
    }

    getFilteredHolidays(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/holidays',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            if (JSON.parse(res).code === 200) {
                this.setHolidayList(JSON.parse(res).business_holidays);
            }
        });
    }

    confirmRow(row, index) {
        let date_data = null;
        if (row.currentData.name) {
            if (row.currentData.id !== null) {
                this.track_changes_edit.forEach((change, id) => {
                    if (change.row_no === index) {
                        date_data = change.data;
                    }
                });
                if (date_data) {
                    const api_data = this.getApiData(row.currentData.name, date_data);
                    this.postToApiEdit(row.currentData.id, api_data);
                } else {
                    const api_data = this.getAnotherApiData(row.currentData);
                    this.postToApiEdit(row.currentData.id, api_data);
                }
                this.inEditMode[index] = false;
                row.confirmEditCreate();
            }
            if (row.currentData.id === null) {
                if (this.track_changes_add.length) {
                    const api_data = this.getApiData(row.currentData.name, this.track_changes_add[0]);
                    this.postToApiAdd(api_data);
                    this.inEditMode[index] = false;
                    row.confirmEditCreate();
                    window.scroll(0, 0);
                } else {
                    this.pop.open('Please Select Date From Date Picker');
                }
            }
        } else {
            this.pop.open('Please Provide Holiday Name');
        }
    }

    getApiData(name, dates) {
        return {
            start_date: moment(dates.startDate).format('YYYY-MM-DD'),
            end_date: moment(dates.endDate).format('YYYY-MM-DD'),
            title: name
        };
    }

    getAnotherApiData(data) {
        return {
            start_date: this.formatDate(data.start_date),
            end_date: this.formatDate(data.end_date),
            title: data.name
        };
    }

    postToApiAdd(api_data) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/holidays', api_data).toPromise().then( res => {
            if (res.code === 200) {
                this.getNewHolidayList();
                this.resetTracking();
                this.alert_message = 'Holiday added successfully';
                this.showSuccessAlert = true;
                this.disableAddRow = false;
                this.search_text = '';
            } else {
                this.disableAddRow = false;
                this.openErrorModal();
            }
        });
    }

    postToApiEdit(id, api_data) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/holidays/' + id, api_data).toPromise().then( res => {
            if (res.code === 200) {
                this.getNewHolidayList();
                this.resetTracking();
                this.alert_message = 'Holiday Updated successfully';
                this.commonTasksAfterSucess();
            } else {
                this.disableAddRow = false;
                this.openErrorModal();
            }
        });
    }

    postToApiDelete(id) {
        this.http.delete('v2/businesses/' + this.storage.user.business_id + '/holidays/' + id).toPromise().then( res => {
            if (res.code === 200) {
                this.getNewHolidayList();
                this.resetTracking();
                this.alert_message = 'Holiday Deleted successfully';
                this.commonTasksAfterSucess();
            } else {
                this.disableAddRow = false;
                this.openErrorModal();
            }
        });
    }

    commonTasksAfterSucess() {
        this.showSuccessAlert = true;
        this.disableAddRow = false;
        this.search_text = '';
        window.scroll(0, 0);
    }

    getNewHolidayList() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/holidays').toPromise().then(res => {
            if (res.code === 200) {
                this.setHolidayList(res.business_holidays);
            }
        });
    }

    resetTracking() {
        this.track_changes_add = [];
        this.track_changes_edit = [];
    }

    formatDate(date) {
        const res = date.split('/');
        return [res[2], res[1], res[0]].join('-');
    }

    editRow(row, index) {
        this.disableAddRow = true;
        this.inEditMode[index] = true;
        row.startEdit();
    }

    deleteRow(row, index) {
        if (row.editing === true) {
            this.disableAddRow = false;
            this.inEditMode[index] = false;
            row.cancelOrDelete();
            let index_to_be_deleted = 0;
            let delete_index = false;

            if (row.currentData.id === null) {
                window.scroll(0, 0);
                this.track_changes_add = [];
            }

            this.track_changes_edit.forEach((change, id) => {
                if (change.row_no === index) {
                    index_to_be_deleted = id;
                    delete_index = true;
                }
            });

            if (delete_index) {
                this.track_changes_edit.splice(index_to_be_deleted, 1);
            }
        } else {
            if (row.currentData.id !== null) {
                this.openConfirmModal(row.currentData.id);
            }
        }
    }

    handleDeliveryTimeline(event, row, index) {
        if (row.currentData.id !== null) {
            let index_to_be_deleted = 0;
            let delete_index = false;
            this.track_changes_edit.forEach((change, id) => {
                if (change.row_no === index) {
                    index_to_be_deleted = id;
                    delete_index = true;
                }
            });
            if (delete_index) {
                this.track_changes_edit.splice(index_to_be_deleted, 1);
                this.setChangesEdit(event, row, index);
            } else {
                this.setChangesEdit(event, row, index);
            }
        }
        if (row.currentData.id === null) {
            this.setChangesAdd(event);
        }
    }

    setChangesEdit(event, row, index) {
        const change_obj = {
            row_no: index,
            data: event
        };
        this.track_changes_edit.push(change_obj);
    }

    setChangesAdd(event) {
        this.track_changes_add = [];
        this.track_changes_add.push(event);
    }

    initiateAgain() {
       this.showSuccessAlert = false;
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

    openConfirmModal(id) {
        const data = {
            type: 'confirm',
            title: 'Confirm',
            text: 'Are you sure you want to delete this holiday?',
            actionTextNo: 'No',
            actionTextYes: 'Yes',
        };

        this.confirmationDialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
            data,
            width: '540px',
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });

        this.dialogButtonActions(id);
    }

    dialogButtonActions(id) {
        const dialogSubscription = this.confirmationDialogRef.componentInstance.onDeclineOrConfirm.subscribe((type) => {
            if (type === 'decline') {

            }
            if (type === 'confirm') {
                this.postToApiDelete(id);
            }
            this.confirmationDialogRef.close();
        });

        this.confirmationDialogRef.afterClosed().subscribe(() => dialogSubscription.unsubscribe());
    }

    handleNewRow(dataSource) {
        this.disableAddRow = true;
        dataSource.createNew();
        window.scrollTo(0, document.body.scrollHeight);
        if (dataSource.currentData) {
            this.inEditMode[dataSource.currentData.length] = true;
        } else {
            this.inEditMode[this.holidayList.length] = true;
        }
    }
}
