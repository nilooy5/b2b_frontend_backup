import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-procurement-orders-timeline-tab',
    templateUrl: './procurement-orders-timeline-tab.component.html',
    styleUrls: ['./procurement-orders-timeline-tab.component.scss']
})

export class ProcurementOrdersTimelineTabComponent implements OnInit {

    orderTimeline;
    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe(res => this.orderTimeline = res.timelines);
    }

    ngOnInit() {
    }

}
