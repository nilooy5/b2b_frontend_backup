import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Confirmation, ConfirmationTypes} from "../../../../models/confirmation";

@Component({
    selector: 'app-confirm-message',
    templateUrl: './confirm-message.component.html',
    styleUrls: ['./confirm-message.component.scss']
})
export class ConfirmMessageComponent implements OnInit {

    @Input() type: string;
    @Input() title: string;
    @Input() text: string;
    @Input() showAnotherButton: boolean = false;
    @Input() confirmation: Confirmation;
    @Input() theme: string;
    @Output() viewDetailsEmitter = new EventEmitter<string>();
    @Input() showControl = true;

    types: any;

    constructor() {
        this.types = ConfirmationTypes;
    }

    ngOnInit() {
        if (this.confirmation) {
            this.type = this.confirmation.type;
            this.title = this.confirmation.title;
            this.text = this.confirmation.message;
            this.showAnotherButton = this.confirmation.showAnotherButton;
        }
    }

    addAnother() {
        window.location.reload();
    }

    viewDetails() {
        this.viewDetailsEmitter.emit();
    }

}
