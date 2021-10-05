import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ConfirmationModalComponent} from '../../../modals/confirmation-modal/confirmation-modal.component';
import {SmsSettingsEditComponent} from './sms-settings-edit/sms-settings-edit.component';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-sms-settings',
    templateUrl: './sms-settings.component.html',
    styleUrls: ['./sms-settings.component.scss']
})
export class SmsSettingsComponent implements OnInit {

    settings: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['action', 'sms', 'actions'];


    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
        // this.dialog.open(SmsSettingsEditComponent, {
        //     data: {type: 'failure', title: 'Order Place Failed!', text: 'lalal', actionText: 'Please Try Again'},
        //     minWidth: '570px',
        //     minHeight: '540px',
        //     panelClass: 'dialog-confirmation'
        // }).afterClosed().subscribe(res => {});
    }

    setData(data) {
        this.settings = data.templates;
        this.dataSource = new MatTableDataSource(this.settings);
    }

    editSmsSetting(id) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/sms-templates/' + id).toPromise().then(res => {
            this.dialog.open(SmsSettingsEditComponent, {
                data: res.sms_template,
                minWidth: '570px',
                minHeight: '540px',
                panelClass: 'dialog-confirmation'
            }).afterClosed().subscribe(close => {
                if (close) { this.submitTemplate(id, close, true); }
            });
        });
    }

    submitTemplate(id, data, refresh) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/sms-templates/' + id, data).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open(res.message);
                if (refresh) { window.location.reload(); }
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.pop.open(err.message);
        });
    }

    togglePublish({checked}, id) {
        const selectedTemplate = this.settings.find(temp => temp.id === id);
        const data = {
            template: selectedTemplate.template,
            is_published: checked ? 1 : 0
        };
        this.submitTemplate(id, data, false);
    }

    applySort(sort) {
        if (sort) {
            this.settings = this.settings.reverse();
            this.dataSource = new MatTableDataSource(this.settings);
        }
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };

        this.getFilteredSettings(filterParams);
    }

    getFilteredSettings(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/sms-templates',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            this.setData({
                templates: JSON.parse(res).sms_templates || []
            });
        });
    }
}
