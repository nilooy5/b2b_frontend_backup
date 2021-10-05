import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleAssignmentFilter} from "../../fleet-management/fleet-assignment/vehicle-assignment-all/vehicle-assignments-filter/vehicle-assignments-filter.component";
import {MatDialog} from '@angular/material';
import {ServiceOptionsComponent} from '../../quick-purchase/service-list/service-options/service-options.component';
import {PurchaseRequestFormSelectComponent} from './purchase-request-form-select/purchase-request-form-select.component';
import * as moment from 'moment';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-purchase-request-create',
    templateUrl: './purchase-request-create.component.html',
    styleUrls: ['./purchase-request-create.component.scss']
})
export class PurchaseRequestCreateComponent implements OnInit {

    generalInformation: FormGroup;
    showgErrorMsg = false;
    showTableColumn = false;
    tableBuilder = FormGroup;
    tableBuilderForm: any[];
    columnTypes: any[] = ['text', 'number', 'radio'];
    questions: any[];
    forms: any[];
    selectedForm: any;
    tableData: any;
    tableInitialData: any = {
        columns: ['column_1', 'column_2', 'column_3', 'column_4'],
        rows: [
            {
                column_1 : 'value',
                column_2 : 'value',
                column_3 : 'value',
                column_4 : 'value',
            }
        ]
    };
    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private pop: PopAlertService
    ) {
        this.route.data.subscribe(res => {
            this.forms = res.forms;
            if (!this.selectedForm) {
                this.selectedForm = this.forms[0];
                this.selectForm();
            }
        });
    }

    filter: VehicleAssignmentFilter = {
        startDate: new Date(),
        viewType: 'month',
        filter: 'vehicle',
        query: ''
    };

    setData(data) {
        this.columnTypes = data as any[];
    }

    ngOnInit() {
        this.generalInformation = this.fb.group({
            selected_form_id: ['', Validators.required],
            requested_for: ['', Validators.required],
            title: ['', Validators.required],
            estimated_price: ['', Validators.required],
            required_date: ['', Validators.required],
            message: ['']
        });

    }
    selectForm() {
        this.dialog.open(PurchaseRequestFormSelectComponent, {
            data: {
                forms: this.forms
            },
            maxWidth: '80%',
            minHeight: '100px',
            panelClass: 'dialog-general'
        }).afterClosed().subscribe(res => {
            if (res && res.selected)
                this.selectedForm = this.forms[res.selected];
        });
    }


    addRow() {
        this.tableBuilderForm.push(
            {
                tableBuilder: this.fb.group({
                    columnName: ['', Validators.required],
                    columnType: ['', Validators.required],
                }),
            }
        );
    }

    addColumn() {
        this.showTableColumn = true;
    }

    deleteRow(i) {
        this.tableBuilderForm.splice(i, 1);
    }

    submitPurchaseRequestForm() {
        this.showgErrorMsg = true;
        if (this.generalInformation.valid) {
            this.getDataAndPost();
        } else {
            this.pop.open("Please fill up the required fields");
        }

    }

    getDataAndPost() {
        const generalInformation = this.generalInformation.getRawValue();

        let variables = this.getTableData();
        const questions = this.getQuestions();
        const submitData = {
            title: generalInformation.title,
            type: generalInformation.requested_for,
            items: JSON.stringify(variables),
            questions: JSON.stringify(questions),
            estimated_price: generalInformation.estimated_price,
            estimated_date: moment(generalInformation.required_date).format('YYYY-MM-DD'),
            form_template_id: this.selectedForm.id,
            description: generalInformation.message
        };
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/purchase-requests', submitData).toPromise().then(res => {

            this.router.navigate(['/', 'dashboard', 'purchase-request', 'list']).catch(err => {
                console.log(err);
            });
        });

    }

    getTableData() {
        const variables = [];
        this.tableData.rows.forEach((row) => {
            let currentData = [];
            this.tableData.columns.forEach((column, index) => {
                if (index !== (this.tableData.columns.length - 1)) {
                    const data = {
                        "title": column,
                        "short_description": '',
                        "instructions": '',
                        "type": "text",
                        "is_required": 1,
                        "result": row[column]
                    };
                    currentData.push(data);
                }
            });
            variables.push(currentData);
        });
        return variables;
    }

    getQuestions() {
        const questionsParsed = [];
        this.questions.forEach((question) => {
            const data = {
                title: question.question,
                is_required: 1,
                short_description: '',
                instructions: '',
                type: question.type
            };
            questionsParsed.push(data);
        });
        return questionsParsed;
    }


    handleQuestionUpdates(event) {
        this.questions = event;
    }

    handleTableUpdate(data) {
        this.tableData = data;
    }
}
