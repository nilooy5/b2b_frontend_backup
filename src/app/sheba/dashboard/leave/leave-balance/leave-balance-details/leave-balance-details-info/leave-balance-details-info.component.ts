import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-leave-balance-details-info',
    templateUrl: './leave-balance-details-info.component.html',
    styleUrls: ['./leave-balance-details-info.component.scss']
})
export class LeaveBalanceDetailsInfoComponent implements OnInit {
    @Input() leaveBalanceInfo;

    constructor() {
    }

    ngOnInit() {
    }

}
