import {Component, OnInit} from '@angular/core';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {DetectDeviceService} from '../../../../helpers/detect-device.service';

@Component({
    selector: 'app-digigo-get-app-now',
    templateUrl: './digigo-get-app-now.component.html',
    styleUrls: ['./digigo-get-app-now.component.scss']
})
export class DigigoGetAppNowComponent implements OnInit {

    appLinks = {
        playstore: 'https://play.google.com/store/apps/details?id=xyz.sheba.emanager',
        appstore: 'https://apps.apple.com/us/app/digigo-office/id1491939278'
    };

    constructor(
        private amplitude: AmplitudeService,
        private deviceType: DetectDeviceService) {
    }

    ngOnInit() {
    }

    getApp(url) {
        this.amplitude.fireCustomEvent(this.amplitude.events.download_app, {
            device: this.deviceType.getDeviceType()
        });
        window.open(url, '_blank');
    }

    getFreeTrial() {
        this.amplitude.fireCustomEvent(this.amplitude.events.inpage_free_trial, {
            device: this.deviceType.getDeviceType()
        });
        window.open('/auth/sign-up?reference=Digigo_Landing');
    }
}
