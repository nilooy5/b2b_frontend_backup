import {Component, OnInit} from '@angular/core';
import {FormEssentials} from '../../../../helpers/classes';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmailCheckService} from '../../auth/email-check.service';

@Component({
    selector: 'app-hero-section',
    templateUrl: './hero-section.component.html',
    styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent extends FormEssentials implements OnInit {

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private emailChecker: EmailCheckService
    ) {
        super();
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    submit() {
        if (this.form.valid) {
            this.emailChecker.checkIfEmailExists(this.form.getRawValue().email).then(doExists => {
                doExists ?
                    this.router.navigate(['/', 'auth', 'login'], {queryParams: this.form.getRawValue()}) :
                    this.router.navigate(['/', 'auth', 'sign-up'], {queryParams: this.form.getRawValue()});
            });
        }
    }

    ngOnInit() {
    }
}
