import {Component, OnInit} from '@angular/core';
import {AmplitudeService} from '../../../services/amplitude.service';
import {DetectDeviceService} from '../../../helpers/detect-device.service';
import {StorageService} from '../../../services/storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-digigo',
    templateUrl: './digigo.component.html',
    styleUrls: ['./digigo.component.scss']
})
export class DigigoComponent implements OnInit {

    userId: any;
    source: any;

    constructor(
        private amplitude: AmplitudeService,
        private deviceType: DetectDeviceService,
        private storage: StorageService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.setLandingData();
    }

    fireAmplitudeEvent() {
        this.amplitude.fireCustomEvent(this.amplitude.events.view_page, {
            user: this.userId,
            source: this.source,
            device: this.deviceType.getDeviceType()
        });
    }

    setLandingData() {
        this.userId = this.storage.user ? this.storage.user.id : 'null';
        this.source = this.activatedRoute.snapshot.queryParamMap.get('source') ? this.activatedRoute.snapshot.queryParamMap.get('source') : 'null';
        this.fireAmplitudeEvent();
    }
}
