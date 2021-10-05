import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-purchase-request-form-card',
    templateUrl: './purchase-request-form-card.component.html',
    styleUrls: ['./purchase-request-form-card.component.scss']
})
export class PurchaseRequestFormCardComponent implements OnInit {
    @Input() form: any;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        // console.log(this.form);
    }

    viewFormDetail(formId) {
        this.router.navigate(['/', 'dashboard', 'purchase-request', 'form-detail', {id: formId }]).catch(err => {
            console.log(err);
        });
    }

}
