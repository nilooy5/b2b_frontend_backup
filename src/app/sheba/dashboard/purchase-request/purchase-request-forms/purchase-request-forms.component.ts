import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-purchase-request-forms',
    templateUrl: './purchase-request-forms.component.html',
    styleUrls: ['./purchase-request-forms.component.scss']
})
export class PurchaseRequestFormsComponent implements OnInit {

    forms: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.forms);
        });
    }

    ngOnInit() {
    }

    setData(forms) {
        this.forms = forms;
    }

    createForm() {
        this.router.navigate(['/', 'dashboard', 'purchase-request', 'form-create']).catch(err => {
            console.log(err);
        });
    }


    createPurchaseRequest() {
        this.router.navigate(['/', 'dashboard', 'purchase-request', 'create']).catch(err => {
            console.log(err);
        });
    }
}
