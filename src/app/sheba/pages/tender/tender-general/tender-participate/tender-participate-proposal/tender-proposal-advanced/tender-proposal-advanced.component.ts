import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tender-proposal-advanced',
    templateUrl: './tender-proposal-advanced.component.html',
    styleUrls: ['./tender-proposal-advanced.component.scss']
})
export class TenderProposalAdvancedComponent implements OnInit {

    @Input() tender;
    currentState: any;
    currentStateIndex = 0;
    totalStates: number;

    constructor() {
    }

    ngOnInit() {
    }

    receiveState($event: any) {
        this.currentState = $event;
        console.log(this.currentState, 'from parent');
    }

    receiveNextStateIndex($event) {
        this.currentStateIndex = $event;
        console.log(this.currentStateIndex);
    }

    receiveTotalStateCount($event) {
        this.totalStates = $event;
    }
}
