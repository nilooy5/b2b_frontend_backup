import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-leave-balance-details-summary',
    templateUrl: './leave-balance-details-summary.component.html',
    styleUrls: ['./leave-balance-details-summary.component.scss']
})
export class LeaveBalanceDetailsSummaryComponent implements OnInit {
    @Input() leaveBalanceSummary;

    constructor() {
    }

    ngOnInit() {
    }

}
