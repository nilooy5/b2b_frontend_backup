import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InspectionForm} from "../../../../../../../types/fleet";
import {FormEssentials} from "../../../../../../../helpers/classes";
import {FormBuilder, Validators} from "@angular/forms";
import {FleetInspectionService} from "../../../../../../../services/fleet-inspection.service";
import {PopAlertService} from "../../../../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage, patchData} from "../../../../../../../helpers/functions";

@Component({
    selector: 'app-fleet-inspection-form-details-general',
    templateUrl: './fleet-inspection-form-details-general.component.html',
    styleUrls: ['./fleet-inspection-form-details-general.component.scss']
})
export class FleetInspectionFormDetailsGeneralComponent extends FormEssentials implements OnInit {
    templateForm: InspectionForm;
    open: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private service: FleetInspectionService,
        private pop: PopAlertService
    ) {
        super();
        this.form = this.fb.group({
            title: ['', Validators.required],
            short_description: ['']
        });
        this.route.parent.parent.data.subscribe(res => {
            this.templateForm = res.template;
        });
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            const data = this.form.getRawValue();
            this.submitting = true;
            this.service.updateForm(this.templateForm.id, data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.toggleOpen();
                    this.pop.open(res.message);
                    patchData(data, this.templateForm);
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            })
        }
    }

    toggleOpen() {
        this.form.patchValue(this.templateForm);
        this.open = !this.open;
    }

}
