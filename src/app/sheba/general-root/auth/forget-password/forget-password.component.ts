import {Component, OnInit} from '@angular/core';
import {FormEssentials} from "../../../../helpers/classes";
import {FormBuilder, Validators} from "@angular/forms";
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {PopAlertService} from "../../../../modules/pop-alert/pop-alert.service";
import {Router} from "@angular/router";
import {getErrorMessage} from "../../../../helpers/functions";

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends FormEssentials implements OnInit {
    title = 'Forgot your password?';
    sub_title = 'Enter your email address to reset your password. ';

    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private pop: PopAlertService,
        private router: Router
    ) {
        super();
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        })
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            this.submitting = true;
            const data = this.form.getRawValue();
            data.from = 'business-portal';
            this.http.post('v2/password/email', data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.form.reset();
                    this.pop.open(res.message);
                    this.router.navigate(['/', 'auth', 'reset-password'], {queryParams: {code: res.code}}).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            })
        }
    }

}
