import {Component, Inject, OnInit} from '@angular/core';
import {WINDOW} from "@ng-toolkit/universal";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    image: string;
    title: string;
    text: string;

    constructor(
        @Inject(WINDOW) public window: Window
    ) {
    }

    ngOnInit() {
        this.window.scrollTo({
            top: 0,
            behavior: "auto"
        });
        this.image = '/assets/img/general-root/home-illustration-leaves.png';
        this.title = 'Maximise your business hours';
        this.text = 'Access hundreds of services from vetted experience professionals to simplify your office operations and save time.'
    }
}
