import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormEssentials} from "../../../../helpers/classes";
import {FormBuilder, Validators} from "@angular/forms";
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {PopAlertService} from "../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage} from "../../../../helpers/functions";
import {AlertService} from "../../../../modules/alert/alert.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends FormEssentials implements OnInit {
    code: string;
    title: string = 'Reset your password';
    sub_title: string = '';
    @ViewChild('alertDiv') alertDiv: ElementRef;
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private router: Router,
        private pop: PopAlertService,
        private alert: AlertService
    ) {
        super();
        this.code = this.route.snapshot.queryParams.code;
        this.form = this.fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            code: ['', Validators.required],
        });

    }

    ngOnInit() {
        if (parseInt(this.code) === 200) {
            this.alert.success(this.alertDiv, "An email is sent to your email address with the code please use this code here.", true, 5000);
        }
    }

    submit() {
        if (this.form.valid) {
            this.submitting = true;
            const data = this.form.getRawValue();
            data.from = 'business-portal';
            this.http.post('v2/password/reset', data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.form.reset();
                    this.pop.open('Your password reset is successful,you can now use this credentials to login');
                    this.router.navigate(['/', 'auth']).catch(err => {
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
