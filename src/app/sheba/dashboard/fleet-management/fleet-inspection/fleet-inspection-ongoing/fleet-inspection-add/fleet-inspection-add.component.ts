import {Component, OnInit} from '@angular/core';
import {InspectionForm, Vehicle} from "../../../../../../types/fleet";
import {ActivatedRoute, Router} from "@angular/router";
import {FormEssentials} from "../../../../../../helpers/classes";
import {FormBuilder, Validators} from "@angular/forms";
import {InspectionScheduleTypes, VehicleTypes, WeekDays} from "../../../../../../helpers/constants";
import {FleetInspectionService} from "../../../../../../services/fleet-inspection.service";
import {IDepartment, IEmployee} from "../../../../../../types/users";
import {EmployeeResolveService} from "../fleet-inspection-ongoing-resolve.service";
import {formatDateTime, getErrorMessage} from "../../../../../../helpers/functions";
import {PopAlertService} from "../../../../../../modules/pop-alert/pop-alert.service";
import {format} from "date-fns";

@Component({
    selector: 'app-fleet-inspection-add',
    templateUrl: './fleet-inspection-add.component.html',
    styleUrls: ['./fleet-inspection-add.component.scss']
})
export class FleetInspectionAddComponent extends FormEssentials implements OnInit {
    forms: InspectionForm[] = [];
    vehicleTypes = VehicleTypes;
    vehicleType: string;
    vehicles: Vehicle[] = [];
    inspectionScheduleType = InspectionScheduleTypes;
    weekDays = WeekDays;
    departments: IDepartment[];
    employees: IEmployee[];
    today: Date = new Date();

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private service: FleetInspectionService,
        private employeeResolve: EmployeeResolveService,
        private router: Router,
        private pop: PopAlertService
    ) {
        super();
        this.route.data.subscribe(res => {
            this.forms = res.forms;
            this.vehicles = res.vehicles;
            this.departments = res.departments;
            this.employees = res.employees;
        });
        this.form = this.fb.group({
            vehicle_id: ['', [Validators.required]],
            inspector_id: ['', [Validators.required]],
            form_template_id: ['', Validators.required],
            schedule_type: ['monthly', [Validators.required]],
            schedule_time: ['', [Validators.required]],
            title: [''],
            schedule_type_value: ['', Validators.required],
            vehicle_type: '',
            department_id: ''
        });
    }

    ngOnInit() {
    }

    setVehicles() {
        const type = this.form.get('vehicle_type').value;
        if (type) {
            this.service.getVehicleWithType(type).toPromise().then(res => {
                this.vehicles = res;
            });
        }
    }

    setEmployees() {
        const department_id = this.form.get('department_id').value;
        this.employeeResolve.getEmployees(0, 100, {department: department_id}).toPromise().then(res => {
            this.employees = res;
        });
    }

    submit() {
        if (this.form.valid) {
            const data = FleetInspectionAddComponent.formatData(this.form.getRawValue());
            this.submitting = true;
            this.service.createInspection(data).toPromise().then(res => {
                this.submitting = false;
                this.pop.open(res.message);
                if (res.code === 200) {
                    this.router.navigate(['/', 'dashboard', 'fleet-management', 'inspection', 'ongoing', res.id, 'details']).catch(err => {
                        console.log(err);
                    })
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.pop.open('Please fill all the required information.');
        }
    }

    static formatData(data) {
        switch (data.schedule_type) {
            case 'monthly':
            case 'weekly':
                data.schedule_type_value = JSON.stringify(data.schedule_type_value);
                break;
            case 'once':
                data.schedule_type_value = formatDateTime(data.schedule_type_value, true);
                data.schedule_type = 'one_time';
                break;
        }

        data.schedule_time = format(data.schedule_time, 'hh:mm A');
        return data;
    }
}
