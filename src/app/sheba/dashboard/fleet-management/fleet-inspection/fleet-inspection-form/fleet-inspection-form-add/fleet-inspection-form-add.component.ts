import {Component, OnInit} from '@angular/core';
import {FormEssentials} from "../../../../../../helpers/classes";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopAlertService} from "../../../../../../modules/pop-alert/pop-alert.service";
import {FleetInspectionService} from "../../../../../../services/fleet-inspection.service";
import {getErrorMessage} from "../../../../../../helpers/functions";
import {InspectionFormItemEvents} from "../fleet-inspection-form-item/fleet-inspection-form-item.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-fleet-inspection-form-add',
    templateUrl: './fleet-inspection-form-add.component.html',
    styleUrls: ['./fleet-inspection-form-add.component.scss']
})
export class FleetInspectionFormAddComponent extends FormEssentials implements OnInit {

    constructor(
        private fb: FormBuilder,
        private pop: PopAlertService,
        private service: FleetInspectionService,
        private router: Router
    ) {
        super();
        this.generateRawForm();
    }

    generateRawForm() {
        this.form = this.fb.group({
            title: ['', [Validators.required]],
            short_description: '',
            variables: this.fb.array([], [Validators.required, Validators.minLength(1)])
        });
    }

    ngOnInit() {
    }

    pushVariable(type: 'radio' | 'text' | 'number') {
        const variables = this.form.get('variables') as FormArray;
        variables.push(this.fb.group({
            title: ['', [Validators.required]],
            short_description: '',
            type: [type, Validators.required],
            is_required: [1, Validators.required],
            instructions: ''
        }));
    }

    removeVariable(index: number) {
        const variables = this.form.get('variables') as FormArray;
        variables.removeAt(index);
    }

    OnItemEvent(item: InspectionFormItemEvents) {
        if (item.event === 'delete') {
            this.removeVariable(item.index);
        }
    }

    submit() {
        if (this.form.invalid) {
            this.pop.open('Please fill all the required field');
        } else {
            const data = this.form.getRawValue();
            data.variables = JSON.stringify(data.variables);
            this.submitting = true;
            this.service.createForm(data).toPromise().then(res => {
                this.submitting = false;
                this.pop.open(res.message);
                if (res.code === 200) this.router.navigate(['/', 'dashboard', 'fleet-management', 'inspection', 'forms', res.id, 'details']).catch(err => {
                    console.log(err);
                });

            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            });
        }
    }

    getControls() {
        const arr = this.form.get('variables') as FormArray;
        return arr.controls as FormGroup[];
    }
}
