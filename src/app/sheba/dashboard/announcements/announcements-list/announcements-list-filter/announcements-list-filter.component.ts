import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { announcementStatus, announcementTypes } from '../../../../../models/announcement';
import * as moment from 'moment';

@Component({
    selector: 'app-announcements-list-filter',
    templateUrl: './announcements-list-filter.component.html',
    styleUrls: ['./announcements-list-filter.component.scss']
})

export class AnnouncementsListFilterComponent implements OnInit {

    @Input() totalAnnouncementsCount;
    @Input() limit;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter();
    public filter: any;
    announcementStatuses: any;
    announcementTypes: any;

    constructor() {
        this.filter = {
            status: null,
            type: null,
            search: null,
            page: 0
        };
        this.announcementStatuses = announcementStatus;
        this.announcementTypes = announcementTypes;
    }

    ngOnInit() { }

    selectStatus(event) {
        event.target.value !== 'all'
            ? this.filter.status = event.target.value
            : this.filter.status = '';

        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectType(event) {
        event.target.value !== 'all'
            ? this.filter.type = event.target.value
            : this.filter.type = '';

        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    search(event) {
        this.searchInputEmitter.emit(event.target.value);
    }

    isPreviousPageUnavailable() {
        return this.filter.page <= 1;
    }

    isNextPageAvailable() {
        return this.totalAnnouncementsCount > this.filter.page + this.limit;
    }

    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }

    previousPage() {
        if (this.isPreviousPageUnavailable()) { return; }
        this.filter.page -= this.limit;
        this.filterEmitter.emit(this.filter);
    }

    nextPage() {
        if (this.isNextPageUnavailable()) { return; }
        this.filter.page += this.limit;
        this.filterEmitter.emit(this.filter);
    }
}
