import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../modules/pop-alert/pop-alert.service';
import {getErrorMessage} from '../../../helpers/functions';
import {AmplitudeService} from '../../../services/amplitude.service';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

    contactUsForm: FormGroup;

    submitting = false;
    showContactUsError = false;

    constructor(private fb: FormBuilder,
                private pop: PopAlertService,
                private http: ShebaHttpService,
                private amplitude: AmplitudeService) { }

    ngOnInit() {
        this.contactUsForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required]
        });
    }

    get contactUsFormControl() {
        return this.contactUsForm.controls;
    }

    submit() {
        if (this.contactUsForm.valid) {
            this.fireAmplitudeEvent();
            const message = this.contactUsForm.getRawValue();
            this.submitting = true;
            this.http.post('v2/business/contact-us', message).toPromise().then((response) => {
                if (response.code === 200) {
                    this.submitting = false;
                    this.contactUsForm.reset();
                    this.pop.open('You message has been sent!');
                } else {
                    this.pop.open(response.message);
                }
            }).catch((err) => {
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.showContactUsError = true;
        }
    }

    fireAmplitudeEvent() {
        this.amplitude.fireCustomEvent(this.amplitude.events.send_msg, {
            email: this.contactUsForm.getRawValue().email,
            name: this.contactUsForm.getRawValue().name
        });
    }

}
