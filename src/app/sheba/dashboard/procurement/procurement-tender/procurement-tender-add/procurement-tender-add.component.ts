import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DashboardResolveService} from '../../../dashboard-resolve.service';
import {StorageService} from '../../../../../services/storage.service';
import {TenderService} from '../../../../../services/tender-service/tender.service';

@Component({
    selector: 'app-procurement-tender-add',
    templateUrl: './procurement-tender-add.component.html',
    styleUrls: ['./procurement-tender-add.component.scss']
})
export class ProcurementTenderAddComponent implements OnInit, OnDestroy {

    constructor(private tenderService: TenderService) { }

    ngOnInit() { }

    ngOnDestroy(): void {
        this.tenderService.clearStorage();
    }


}
