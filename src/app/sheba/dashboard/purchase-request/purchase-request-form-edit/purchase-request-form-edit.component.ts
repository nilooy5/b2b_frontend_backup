import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../services/storage.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-purchase-request-form-edit',
    templateUrl: './purchase-request-form-edit.component.html',
    styleUrls: ['./purchase-request-form-edit.component.scss']
})
export class PurchaseRequestFormEditComponent implements OnInit {

    generalInformation: FormGroup;
    tableBuilder = FormGroup;
    showErrorMsg = false;
    showTableColumn = false;
    tableBuilderForm: any[];
    columnTypes: any[] = ['text', 'number', 'radio'];
    questions: any[];
    details: any;
    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute,
    ) {

    }

    setData(data) {
        this.columnTypes = data as any[];
    }

    ngOnInit() {
        this.generalInformation = this.fb.group({
            name: ['', Validators.required],
            shortDescription: ['', Validators.required]
        });

        this.tableBuilderForm = [
            // {
            //     tableBuilder: this.fb.group({
            //         columnName:  ['', Validators.required],
            //         columnType: ['', Validators.required],
            //     }),
            // }
        ];

        this.route.data.subscribe(res => {
            this.details = res.detail;
            console.log(res);
            this.generalInformation.setValue({
                name: this.details.title,
                shortDescription: this.details.short_description
            });
            if(this.details.items.length > 0) this.showTableColumn = true;
            this.details.items.forEach((item) => {
                const tableBuilder =   this.fb.group({
                    columnName: ['', Validators.required],
                    columnType: ['', Validators.required],
                });
                tableBuilder.setValue({
                    columnName: item.title,
                    columnType: item.type
                });
                this.tableBuilderForm.push({tableBuilder});
            });
            console.log(this.tableBuilderForm);
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

    handleQuestionUpdates(event) {
        this.questions = event;
    }

    submitPurchaseRequestForm() {
        this.showErrorMsg = true;

        const generalInformation = this.generalInformation.getRawValue();
        const variables = [];
        this.tableBuilderForm.forEach((formData) => {
            const rawData = formData.tableBuilder.getRawValue();
            const data = {
                title: rawData.columnName,
                is_required: 1,
                short_description: '',
                instructions: '',
                type: rawData.columnType
            };
            variables.push(data);
        });
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
        const submitData = {
            title: generalInformation.name,
            short_description: generalInformation.shortDescription,
            variables: JSON.stringify(variables),
            questions: JSON.stringify(questionsParsed),
            type: 'purchase_request'
        };
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/form-templates/' + this.details.id, submitData)
            .toPromise().then(res => {
            this.router.navigate(['/', 'dashboard', 'purchase-request', 'forms']).catch(err => {
                console.log(err);
            });
        });
    }

}
