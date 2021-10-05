import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FormEssentials} from '../../../../helpers/classes';

@Component({
    selector: 'app-home-form-section',
    templateUrl: './home-form-section.component.html',
    styleUrls: ['./home-form-section.component.scss']
})
export class HomeFormSectionComponent extends FormEssentials implements OnInit {

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        super();
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    submit() {
        if (this.form.valid) {
            this.router.navigate(['/', 'auth', 'sign-up'], {queryParams: this.form.getRawValue()});
        }
    }

    ngOnInit() {
    }

}
