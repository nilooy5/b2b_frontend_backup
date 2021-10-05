import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InspectionForm} from "../../../../../../../types/fleet";
import {FailedItemStatus} from "../../../../../../../helpers/constants";

@Component({
    selector: 'app-fleet-inspection-failed-item-list-filter',
    templateUrl: './fleet-inspection-failed-item-list-filter.component.html',
    styleUrls: ['./fleet-inspection-failed-item-list-filter.component.scss']
})
export class FleetInspectionFailedItemListFilterComponent implements OnInit {
    @Input() formList: InspectionForm[] = [];
    filter = {
        inspection_form: null,
        status:null,
    };
    @Output() OnFilterEvents: EventEmitter<any> = new EventEmitter();
    failedItemStatus=FailedItemStatus;
    constructor() {
    }

    ngOnInit() {
    }

    OnFilter() {
        this.OnFilterEvents.emit(this.filter);
    }

}
