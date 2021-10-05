import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-driver-vehicle',
    templateUrl: './driver-vehicle.component.html',
    styleUrls: ['./driver-vehicle.component.scss']
})
export class DriverVehicleComponent implements OnInit {

    public info: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.info = res.info;
        });
    }

    ngOnInit() {
    }

}
