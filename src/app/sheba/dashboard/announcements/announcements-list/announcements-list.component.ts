import {Component, OnDestroy} from '@angular/core';
import { ITEMS_PER_PAGE } from './announcemnts-list.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { AnnouncementsListService } from './announcements-list.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-announcements-list',
    templateUrl: './announcements-list.component.html',
    styleUrls: ['./announcements-list.component.scss']
})

export class AnnouncementsListComponent implements OnDestroy {

    static readonly ITEMS_PER_PAGE = ITEMS_PER_PAGE;

    displayedColumns = ['id', 'type', 'title', 'status', 'end_date', 'created_at', 'actions'];

    announcementList$: Subscription;
    dataSource: MatTableDataSource<any>;
    announcements: any[];
    filteredAnnouncements: any[];
    totalAnnouncementsCount: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private announcementsListService: AnnouncementsListService) {
        this.announcementList$ = this.route.data.subscribe(({ announcementsList }) => {
            const { announcements, totalAnnouncements } = announcementsList;
            this.setAnnouncementsData(announcements, totalAnnouncements);
        });
    }

    ngOnDestroy(): void {
        this.announcementList$.unsubscribe();
    }

    getLimit() {
        return AnnouncementsListComponent.ITEMS_PER_PAGE;
    }

    setAnnouncementsData(announcements, totalAnnouncements) {
        announcements && announcements.length ? this.announcements = announcements : this.announcements = [];
        this.filteredAnnouncements = this.announcements;
        this.setTotalAnnouncementsCount(totalAnnouncements);
        this.setTableDataSource(this.filteredAnnouncements);
    }

    setTotalAnnouncementsCount(count) {
        this.totalAnnouncementsCount = count;
    }

    setTableDataSource(filteredAnnouncements) {
        this.dataSource = new MatTableDataSource(filteredAnnouncements);
    }

    redirectToAnnouncement(id) {
        const url = this.router.serializeUrl(this.router.createUrlTree(['/dashboard/announcements/' + id]));
        window.open(url, '_blank');
    }

    trackByFn(index, item) {
        return index;
    }

    handleSearch(key) {
        this.filteredAnnouncements = this.announcements.filter(item => {
            return item.title.toLowerCase().includes(key.toLowerCase());
        });
        this.setTotalAnnouncementsCount(this.filteredAnnouncements.length);
        this.setTableDataSource(this.filteredAnnouncements);
    }

    filterAnnouncements(filter) {
        const { status, type } = filter;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: filter.page.toString(),
            status: 'Ongoing'
        };

        if (status && status !== 'all') {
            console.log(status);
            filterParams['status'] = status;
        }

        if (status === '') {
            filterParams['status'] = '';
        }

        if (type && type !== 'all') {
            filterParams['type'] = type;
        }

        this.announcementsListService.getFilteredAnnouncementsList(filterParams).toPromise()
            .then(({ announcements, totalAnnouncements}) => {
                this.setAnnouncementsData(announcements, totalAnnouncements);
            });

    }

}
