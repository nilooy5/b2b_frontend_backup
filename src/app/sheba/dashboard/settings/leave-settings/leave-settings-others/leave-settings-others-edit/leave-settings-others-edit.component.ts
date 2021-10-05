import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {NotifyModalComponent} from '../../modals/notify-modal/notify-modal.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-leave-settings-others-edit',
    templateUrl: './leave-settings-others-edit.component.html',
    styleUrls: ['./leave-settings-others-edit.component.scss']
})
export class LeaveSettingsOthersEditComponent implements OnInit {

    isChecked: boolean;
    othersInfo;
    monthNumber;
    confirmationDialogRef;
    months: any = [
        { key: 1, title: 'January' },
        { key: 2, title: 'February' },
        { key: 3, title: 'March' },
        { key: 4, title: 'April' },
        { key: 5, title: 'May' },
        { key: 6, title: 'June' },
        { key: 7, title: 'July' },
        { key: 8, title: 'August' },
        { key: 9, title: 'September' },
        { key: 10, title: 'October' },
        { key: 11, title: 'November' },
        { key: 12, title: 'December' },
    ];

    constructor(private route: ActivatedRoute,
                private http: ShebaHttpService,
                private storage: StorageService,
                private router: Router,
                private dialog: MatDialog) {
        this.route.data.subscribe(res => {
            this.setInfo(res.leaveSettingOthersInfo.others_info);
            this.setSandwichLeaveStatus();
            console.log(this.othersInfo);
        });
    }

    ngOnInit() {
    }

    setInfo(info) {
        this.othersInfo = info;
        this.monthNumber = info.fiscal_year_start_month;
    }

    setSandwichLeaveStatus() {
        this.isChecked = !!this.othersInfo.sandwich_leave;
    }

    selectMonth(event) {
       this.monthNumber =  event.target.value;
    }

    saveChanges() {
        const api_data = {
            sandwich_leave: this.isChecked ? 1 : 0,
            fiscal_year: this.monthNumber
        };
        this.postToApi(api_data);
    }

    postToApi(data) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/leaves/settings/others', data).toPromise().then(res => {
            if (res.code === 200) {
                this.router.navigate(['/', 'dashboard', 'settings', 'leave', 'others'], {state: {alertStatus: true}}).catch(err => {
                    console.log(err);
                });
            } else {
                this.openNotifyModal(data);
            }
        });
    }

    openNotifyModal(api_data) {
        const data = {
            type: 'failure',
            title: 'This is a error message',
            text: 'Something went terribly wrong! Please, try again later! ',
            actionTextOne: 'Try Again',
            actionTextTwo: 'Close'
        };

        this.confirmationDialogRef = this.dialog.open(NotifyModalComponent, {
            data,
            width: '540px',
            maxWidth: '540px',
            height: 'auto',
            panelClass: 'dialog-confirmation'
        });

        this.dialogButtonActions(api_data);
    }

    dialogButtonActions(api_data) {
        const dialogSubscription = this.confirmationDialogRef.componentInstance.onConfirmOrError.subscribe((type) => {
            if (type === 'try-again') {
                this.postToApi(api_data);
            }
            this.confirmationDialogRef.close();
        });
        this.confirmationDialogRef.afterClosed().subscribe(() => dialogSubscription.unsubscribe());
    }

}
