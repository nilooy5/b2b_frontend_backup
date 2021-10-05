import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {ActivatedRoute} from '@angular/router';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-driver-image-edit',
    templateUrl: './driver-image-edit.component.html',
    styleUrls: ['./driver-image-edit.component.scss']
})
export class DriverImageEditComponent implements OnInit {
    imageForm: FormGroup;
    driverId: number;

    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private route: ActivatedRoute,
        private pop: PopAlertService
    ) {
    }

    ngOnInit() {
        this.imageForm = this.fb.group({
            driverPhoto: ['', Validators.required]
        });
        this.driverId = this.route.snapshot.parent.parent.params.driver_id;
    }

    changePicture() {
        const data = {
            image: this.imageForm.getRawValue().driverPhoto
        };
        this.http.postWithFiles('v2/members/' + this.storage.user.member_id + '/drivers/' + this.driverId + '/update-picture', data).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open(res.message);
                window.location.reload();
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.pop.open(err.message);
        });
    }


}
