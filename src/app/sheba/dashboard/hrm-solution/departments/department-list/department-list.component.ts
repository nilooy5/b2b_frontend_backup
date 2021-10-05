import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {SmsSettingsEditComponent} from '../../../settings/sms-settings/sms-settings-edit/sms-settings-edit.component';
import {DepartmentAddModalComponent} from './department-add-modal/department-add-modal.component';
import {DepartmentAddRoleModalComponent} from './department-add-role-modal/department-add-role-modal.component';

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

    departments: any[] = [];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['name', 'created_at', 'actions'];

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.departments);
        });
    }

    ngOnInit() {
    }

    setData(data) {
        this.departments = data as any[];
        this.dataSource = new MatTableDataSource(this.departments);
    }

    addDepartment() {
        this.dialog.open(DepartmentAddModalComponent, {
            data: {},
            minWidth: '570px',
            minHeight: '540px',
            panelClass: 'dialog-confirmation'
        }).afterClosed().subscribe(close => {
            console.log(close);
        });
    }

    addRole(dept) {
        this.dialog.open(DepartmentAddRoleModalComponent, {
            data: { department: dept },
            minWidth: '570px',
            minHeight: '540px',
            panelClass: 'dialog-confirmation'
        }).afterClosed().subscribe(close => {
            console.log(close);
        });
    }

    searchDepartments(key) {
        let result = [];

        result = this.departments.filter((dept) => dept.name ? dept.name.toLowerCase().includes(key.toLowerCase()) : false);

        this.dataSource = new MatTableDataSource(result);
    }

    sortDepartments(sort) {
        if (sort) {
            this.departments = this.departments.reverse();
            this.dataSource = new MatTableDataSource(this.departments);
        }
    }

    editDepartment() {

    }

    removeDepartment() {

    }

}
