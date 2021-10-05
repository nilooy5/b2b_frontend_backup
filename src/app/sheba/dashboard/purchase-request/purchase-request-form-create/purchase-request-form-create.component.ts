import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../services/storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-purchase-request-form-create',
    templateUrl: './purchase-request-form-create.component.html',
    styleUrls: ['./purchase-request-form-create.component.scss']
})
export class PurchaseRequestFormCreateComponent implements OnInit {

    generalInformation: FormGroup;
    tableBuilder = FormGroup;
    showErrorMsg = false;
    showTableColumn = false;
    tableBuilderForm: any[];
    columnTypes: any[] = ['text', 'number', 'radio'];
    questions: any[];
    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
    ) { }

    setData(data) {
        this.columnTypes = data as any[];
    }

    ngOnInit() {
        this.generalInformation = this.fb.group({
            name: ['', Validators.required],
            shortDescription: ['', Validators.required]
        });

        this.tableBuilderForm = [
            {
                tableBuilder: this.fb.group({
                    columnName: ['', Validators.required],
                    columnType: ['', Validators.required],
                }),
            }
        ];
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
        const tableBuilderData  = this.tableBuilderForm.forEach((formData) => {
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
        const questions = this.questions.forEach((question) => {
            const data = {
                title: question.question,
                is_required: 1,
                short_description: '',
                instructions: '',
                type: question.type
            };
            questionsParsed.push(data);
        });
        console.log(questionsParsed);
        const submitData = {
            title: generalInformation.name,
            short_description: generalInformation.shortDescription,
            variables: JSON.stringify(variables),
            questions: JSON.stringify(questionsParsed),
            type: 'purchase_request'
        };
        console.log(submitData);
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/form-templates', submitData).toPromise().then(res => {

            this.router.navigate(['/', 'dashboard', 'purchase-request', 'forms']).catch(err => {
                console.log(err);
            });
        });
    }

}
