import {Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {SelectPickerWithSearchComponent} from '../../../../../modules/select-picker-with-search/select-picker-with-search/select-picker-with-search.component';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-approval-form',
    templateUrl: './approval-form.component.html',
    styleUrls: ['./approval-form.component.scss']
})

export class ApprovalFormComponent implements OnInit, DoCheck {

    @Input() page;
    @ViewChild(SelectPickerWithSearchComponent) private pickerWithSearch: SelectPickerWithSearchComponent;

    types: any[];
    departments: any[];
    employees: any[];
    employees_formatted: any[] = [];
    selectedEmployees: any[] = [];
    approvalForm: FormGroup;
    submitting = false;
    showSelectedEmployeeError = false;
    showApprovalError = false;
    approvalId: number;

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) {
        this.constructForm();
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({approvalDetailsResolver}) => {
            const {types, departments, employees, approval_flow_details} = approvalDetailsResolver;
            this.setTypes(types);
            this.setDepartments(departments);
            this.setEmployees(employees);
            if (this.page === 'details') {
                this.setApprovalFlowDetails(approval_flow_details);
            }
        });
    }

    constructForm() {
        this.approvalForm = this.formBuilder.group({
            type: ['', Validators.required],
            approvalTitle: ['', Validators.required],
            department: ['', Validators.required],
            employees: ['']
        });
    }

    ngDoCheck() {
        if (this.selectedEmployees.length > 0) {
            this.showSelectedEmployeeError = false;
        } else {
            this.pickerWithSearch.resetSelect();
        }
    }

    setTypes(types) {
        types && types.length ? this.types = types : this.types = [];
    }

    setDepartments(departments) {
        departments && departments.length ? this.departments = departments : this.departments = [];
    }

    setEmployees(employees) {
        if (employees && employees.length) {
            this.employees = employees;
            this.employees.forEach(employ => {
                const employ_formatted = {
                    id: employ.id,
                    name: employ.profile.name,
                    pro_pic: employ.profile.pro_pic,
                    designation: employ.designation,
                    department: employ.department
                };
                this.employees_formatted.push(employ_formatted);
            });
        } else {
            this.employees = [];
        }
    }

    setApprovalFlowDetails(approvalDetails) {
        this.approvalForm.patchValue({
            approvalTitle: approvalDetails.title,
            department: approvalDetails.department.id,
            type: approvalDetails.type
        });
        this.selectedEmployees = approvalDetails.request_approvers;
        this.approvalId = approvalDetails.id;
    }

    selectedEmployee($event) {
        if (this.selectedEmployees && this.selectedEmployees.length > 0) {
            const duplicateSelectedEmployee = this.checkForDuplicateEmployee($event);
            if (duplicateSelectedEmployee) {
                this.pop.open('Duplicate Employee Selected');
            } else {
                this.pushIntoSelectedEmployeeArray($event);
            }
        } else {
            this.pushIntoSelectedEmployeeArray($event);
        }
    }

    checkForDuplicateEmployee($event) {
        return this.selectedEmployees.find((item) => item.id === $event.id);
    }

    pushIntoSelectedEmployeeArray($event) {
        this.selectedEmployees.push({
            id: $event.id,
            pro_pic: $event.pro_pic,
            name: $event.name,
            designation: $event.designation,
            department: $event.department
        });
    }

    submitApprovalFlow() {
        if (this.approvalForm.valid && this.selectedEmployees.length > 0) {
            this.submitting = true;
            const data = this.approvalForm.getRawValue();
            const employeeIds = this.selectedEmployees.map(({id}) => id);
            const submittedData = {
                type: data.type,
                title: data.approvalTitle,
                business_department_id: data.department,
                employee_ids: JSON.stringify(employeeIds)
            };
            this.postToApi(submittedData);
        } else {
            this.showApprovalError = true;
            this.showSelectedEmployeeError = true;
        }
    }

    clearForm() {
        this.approvalForm.reset();
        this.pickerWithSearch.resetSelect();
        this.selectedEmployees = [];
    }

    postToApi(data) {
        let url;
        if (this.page === 'create') {
            url = 'v2/businesses/' + this.storage.user.business_id + '/approval-flows';
        }
        if (this.page === 'details') {
            url = 'v2/businesses/' + this.storage.user.business_id + '/approval-flows/' + this.approvalId;
        }

        this.http.post(url, data).toPromise().then(res => {
            if (res.code === 200) {
                this.submitting = false;
                this.showApprovalError = false;
                this.pop.open('Approval Created Successfully');
                if (this.page === 'create') {
                    this.clearForm();
                }
            } else {
                this.submitting = false;
                this.pop.open(res.message);
            }
        }).catch(err => this.pop.open(err.message));
    }

    removeSelectedEmployee(id: number) {
        this.selectedEmployees.splice(this.selectedEmployees.findIndex(item => item.id === id), 1);
    }
}
