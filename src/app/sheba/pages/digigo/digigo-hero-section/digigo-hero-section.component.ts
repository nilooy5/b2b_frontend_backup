import {Component, OnInit} from '@angular/core';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {DetectDeviceService} from '../../../../helpers/detect-device.service';
import Lity from 'lity';

@Component({
    selector: 'app-digigo-hero-section',
    templateUrl: './digigo-hero-section.component.html',
    styleUrls: ['./digigo-hero-section.component.scss']
})
export class DigigoHeroSectionComponent implements OnInit {

    constructor(
        private amplitude: AmplitudeService,
        private deviceType: DetectDeviceService) {
    }

    ngOnInit() {
    }

    getFreeTrial() {
        this.amplitude.fireCustomEvent(this.amplitude.events.inpage_free_trial, {
            device: this.deviceType.getDeviceType()
        });
        window.open('/auth/sign-up?reference=Digigo_Landing');
    }

    watchDemo() {
        this.amplitude.fireCustomEvent(this.amplitude.events.watch_demo, {
            device: this.deviceType.getDeviceType()
        });
        Lity('https://www.youtube.com/watch?v=UeJerMmgIzU');
    }
}
