import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-purchase-request-form-select-card',
    templateUrl: './purchase-request-form-card.component.html',
    styleUrls: ['./purchase-request-form-card.component.scss']
})
export class PurchaseRequestFormCardComponent implements OnInit {
    @Input() form: any;
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

    selectForm(index){
        this.select.emit(index);
    }
}
