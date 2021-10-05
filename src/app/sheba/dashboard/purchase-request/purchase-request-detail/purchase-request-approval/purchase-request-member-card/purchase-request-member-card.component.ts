import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-purchase-request-member-card',
    templateUrl: './purchase-request-member-card.component.html',
    styleUrls: ['./purchase-request-member-card.component.scss']
})
export class PurchaseRequestMemberCardComponent implements OnInit {
    @Input() employee: any;
    @Input() selected: any;
    @Input() index: any;
    @Output() select: EventEmitter<string> = new EventEmitter<string>();
    @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private router: Router
    ) { }

    ngOnInit() {

    }

    viewFormDetail(formId) {
        this.closeModal.emit(true);
        this.router.navigate(['/', 'dashboard', 'purchase-request', 'form-detail', {id: formId }]).catch(err => {
            console.log(err);
        });
    }

    selectForm(index) {
        this.select.emit(index);
    }
}
