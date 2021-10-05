import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormEssentials} from "../../../../../helpers/classes";
import {ShebaHttpService} from "../../../../../modules/sheba-http/sheba-http.service";
import {PopAlertService} from "../../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage} from "../../../../../helpers/functions";
import {AlertService} from "../../../../../modules/alert/alert.service";
import {StorageService} from "../../../../../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent extends FormEssentials implements OnInit {
    @ViewChild('alertDiv') alertDiv: ElementRef;

    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private pop: PopAlertService,
        private alert: AlertService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        super();
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    ngOnInit() {
        const data = {email: this.route.snapshot.queryParams.email};
        this.form.patchValue(data);
    }

    submit() {
        if (this.form.valid) {
            const data = this.form.getRawValue();
            this.submitting = true;
            this.http.post('v2/business/register', data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.storage.user = res.info;
                    this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                        this.router.navigate(['/', 'dashboard']).catch(e => {
                            console.log(e);
                        });
                    });
                } else if (res.code === 420) {
                    this.router.navigate(['/', 'auth', 'login'], {queryParams: {email: data.email}});
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.alert.error(this.alertDiv, 'Please fill out the form correctly', true);
        }
    }
}
