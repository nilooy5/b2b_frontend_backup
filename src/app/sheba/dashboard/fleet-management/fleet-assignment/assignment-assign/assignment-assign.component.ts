import {Component, OnInit} from '@angular/core';
import {FleetService} from "../../../../../services/fleet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FleetDriver, TripRequest, Vehicle} from "../../../../../types/fleet";
import {PopAlertService} from "../../../../../modules/pop-alert/pop-alert.service";

@Component({
    selector: 'app-assignment-assign',
    templateUrl: './assignment-assign.component.html',
    styleUrls: ['./assignment-assign.component.scss']
})
export class AssignmentAssignComponent implements OnInit {
    vehicles: Vehicle[];
    drivers: FleetDriver[];
    request: TripRequest;
    driver_id: number;
    vehicle_id: number;
    submitting: boolean;
    showSuccess: boolean = false;
    tripID: number;

    constructor(
        private service: FleetService,
        private route: ActivatedRoute,
        private router: Router,
        private pop: PopAlertService
    ) {
        this.route.data.subscribe(res => {
            this.vehicles = res.vehicles;
            this.drivers = res.drivers;
            this.request = res.tripRequest;
        });
    }

    ngOnInit() {
    }

    OnDriverSelect(driver) {
        if (driver) {
            this.driver_id = driver.id
        } else {
            this.driver_id = null;
        }
    }

    OnVehicleSelect(vehicle) {
        if (vehicle) {
            this.vehicle_id = vehicle.id;
        } else {
            this.vehicle_id = null;
        }
    }

    submit() {
        if (this.request && this.driver_id && this.vehicle_id) {
            const data = {
                trip_request_id: this.request.id,
                vehicle_id: this.vehicle_id,
                driver_id: this.driver_id,
                status: 'accept'
            };
            this.service.postTrip(data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.showSuccess = true;
                    this.tripID = res.id;
                } else {
                    this.pop.open(res.message);
                }
            })
        } else {
            this.pop.open("Please select a driver and a vehicle")
        }
    }
}
