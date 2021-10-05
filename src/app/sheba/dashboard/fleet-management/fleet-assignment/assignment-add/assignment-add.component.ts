import {Component, OnInit} from '@angular/core';
import {FormEssentials} from "../../../../../helpers/classes";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Member, Vehicle} from "../../../../../types/fleet";
import {PopAlertService} from "../../../../../modules/pop-alert/pop-alert.service";
import {FleetService} from "../../../../../services/fleet.service";
import {TripTypes, VehicleTypes} from "../../../../../helpers/constants";
import {formatDateTime, getErrorMessage} from "../../../../../helpers/functions";

@Component({
    selector: 'app-assignment-add',
    templateUrl: './assignment-add.component.html',
    styleUrls: ['./assignment-add.component.scss']
})
export class AssignmentAddComponent extends FormEssentials implements OnInit {
    vehicles: Vehicle[] = [];
    members: Member[] = [];
    tripTypes = TripTypes;
    vehicleTypes = VehicleTypes;
    today = new Date();

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private pop: PopAlertService,
        private service: FleetService,
        private router: Router
    ) {
        super();
        this.form = this.fb.group({
            member_id: ['', Validators.required],
            reason: '',
            details: '',
            trip_type: '',
            pickup_address: ['', [Validators.required]],
            dropoff_address: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            end_date: [''],
            vehicle_type: ['', [Validators.required]],
            no_of_seats: [1, [Validators.required, Validators.min(1)]]
        });
        this.route.data.subscribe(res => {
            this.setData(res);
        })
    }

    setData(res) {
        this.members = res.members;
        this.vehicles = res.vehicles;
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            const data = this.form.getRawValue();
            if (data.start_date) data.start_date = formatDateTime(data.start_date);
            if (data.end_date) data.end_date = formatDateTime(data.end_date);
            this.submitting = true;
            this.service.vehicleRequest(data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.router.navigate(['/', 'dashboard', 'fleet-management', 'assignments', res.id, 'assign']).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            })
            // this.service.Request = data;
            // this.router.navigate(['/', 'dashboard', 'fleet-management', 'assignments', 'assign'], {queryParams: {next: 1}}).catch(err => {
            //     console.log(err);
            // });
        } else {
            this.pop.open("Please fill the form correctly");
        }
    }
}
