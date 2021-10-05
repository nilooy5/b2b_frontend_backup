import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-approver-card',
    templateUrl: './approver-card.component.html',
    styleUrls: ['./approver-card.component.scss']
})
export class ApproverCardComponent implements OnInit {
    @Input() approver: any = null;

    constructor() {
    }

    ngOnInit() {
    }

}
