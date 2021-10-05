import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InspectionForm} from "../../../../../../../types/fleet";
import {InspectionScheduleTypes} from "../../../../../../../helpers/constants";

@Component({
    selector: 'app-fleet-inspection-ongoing-list-filter',
    templateUrl: './fleet-inspection-ongoing-list-filter.component.html',
    styleUrls: ['./fleet-inspection-ongoing-list-filter.component.scss']
})
export class FleetInspectionOngoingListFilterComponent implements OnInit {
    @Input() formList: InspectionForm[];
    @Output() OnFilterEvent: EventEmitter<any> = new EventEmitter();
    types = InspectionScheduleTypes;
    filter = {
        inspection_form: null,
        type: null
    };

    constructor() {
    }

    ngOnInit() {
    }

    OnFilter() {
        this.OnFilterEvent.emit(this.filter);
    }

}
