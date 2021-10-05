import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material";
import {PopAlertService} from "../../../../modules/pop-alert/pop-alert.service";
import {VendorService} from "../../../../services/vendor.service";

@Component({
    selector: 'app-vendor-invite',
    templateUrl: './vendor-invite.component.html',
    styleUrls: ['./vendor-invite.component.scss']
})
export class VendorInviteComponent implements OnInit {
    numbers: string[] = [];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    submitting: boolean;
    sent = false;

    constructor(
        private pop: PopAlertService,
        private service: VendorService
    ) {
    }

    ngOnInit() {
    }

    add(event: MatChipInputEvent) {
        const val = event.value;
        const operators = '/|017|016|018|019|013|015|/';
        console.log(val.match(operators));
        if (!val) return;
        if (val.match(/[0-9]/) && val.length === 11 && val.match(operators)) {
            if (!this.numbers.find(item => {
                return item === val
            })) {
                this.numbers.push(val);
            }
            event.input.value = '';
        } else {
            event.input.value = '';
            this.pop.open('Invalid Mobile Number');
        }
    }

    remove(index) {
        this.numbers.splice(index, 1);
    }

    invite() {
        if (this.numbers.length) {
            const numbers = JSON.stringify(this.numbers);
            const data = {numbers};
            this.submitting = true;
            this.service.inviteVendors(data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.sent = true;
                    this.numbers = [];
                } else {
                    this.pop.open(res.message);
                }
            });

        } else {
            this.pop.open('Please add a mobile number to invite a vendor');
        }
    }
}
