import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FormEssentials} from '../../../../helpers/classes';
import {AlertService} from '../../../../modules/alert/alert.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {getErrorMessage} from '../../../../helpers/functions';
import {StorageService} from '../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SwRegisterService} from '../../../../sw-register.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent extends FormEssentials implements OnInit {
    title = 'Welcome back';
    sub_title = 'Login to Sheba.xyz business';
    @ViewChild('alertDiv') alertDiv: ElementRef;

    constructor(
        private fb: FormBuilder,
        private alert: AlertService,
        private pop: PopAlertService,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute,
        private sWRegisterService: SwRegisterService
    ) {
        super();
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            remember_me: ''
        });
    }

    ngOnInit() {
        const data = {email: this.route.snapshot.queryParams.email};
        this.form.patchValue(data);
    }

    submit() {
        if (this.form.valid) {
            this.submitting = true;
            const data = this.form.getRawValue();
            this.http.post('v2/business/login', data).toPromise().then(res => {
                this.submitting = false;
                if (res != null && res.code === 200) {
                    this.storage.user = res.info;
                    this.sWRegisterService.registerServiceWorker();
                    if (this.storage.user.is_super) {
                        this.router.navigate(['/', 'dashboard', 'rfq']).catch(err => {
                            console.log(err);
                        });
                    } else {
                        this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                            console.log(err);
                        });
                    }
                } else {
                    if (res != null) {
                        this.pop.open(res.message);
                    } else {
                        this.pop.open('Something went wrong');
                    }
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.alert.error(this.alertDiv, 'Please fill the form correctly', true);
        }
    }
}
