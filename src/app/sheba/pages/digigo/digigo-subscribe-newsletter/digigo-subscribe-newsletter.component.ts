import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {AmplitudeService} from '../../../../services/amplitude.service';
import {DetectDeviceService} from '../../../../helpers/detect-device.service';

@Component({
    selector: 'app-digigo-subscribe-newsletter',
    templateUrl: './digigo-subscribe-newsletter.component.html',
    styleUrls: ['./digigo-subscribe-newsletter.component.scss']
})
export class DigigoSubscribeNewsletterComponent implements OnInit {
    email = new FormControl('');

    constructor(
        private fb: FormBuilder,
        private pop: PopAlertService,
        private http: ShebaHttpService,
        private amplitude: AmplitudeService,
        private deviceType: DetectDeviceService) {
    }

    ngOnInit() {
    }

    onClick() {
        if (this.email.valid) {

            this.fireAmplitudeEvent();
            const data = {
                email: this.email.value,
                portal_name: 'business-portal'
            };

            this.http.post('v2/newsletter', data).toPromise().then((res) => {
                if (res.code === 200) {
                    this.email.reset();
                    this.pop.open(res.message);
                } else {
                    this.pop.open(res.message);
                }
            });
        }
    }

    fireAmplitudeEvent() {
        this.amplitude.fireCustomEvent(this.amplitude.events.subscribe, {
            email: this.email.value
        });
    }
}
