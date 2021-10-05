import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-fleet-fuel-history',
    templateUrl: './fleet-fuel-history.component.html',
    styleUrls: ['./fleet-fuel-history.component.scss']
})
export class FleetFuelHistoryComponent implements OnInit {
    history: any[] = [];
    info: any = null;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle', 'time', 'quantity', 'total', 'actions'];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.history);
        });
    }

    ngOnInit() {
    }

    setData(data) {
        this.history = data.logs as any[];
        this.info = data.info as any[];
        this.dataSource = new MatTableDataSource(this.history);
    }

    applyFilter(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };

        if (filter.start_date) { filterParams['start_date'] = filter.start_date; }
        if (filter.end_date) { filterParams['end_date'] = filter.end_date; }
        if (filter.type) { filterParams['type'] = filter.type; }

        this.getFilteredInspections(filterParams);
    }

    applySort(sort) {
        if (sort) {
            this.history = this.history.reverse();
            this.dataSource = new MatTableDataSource(this.history);
        }
    }

    getFilteredInspections(filters) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/fuel-logs',
            {
                params: filters,
                responseType: 'text'
            }).toPromise()
            .then(res => {
                this.setData({
                    logs: JSON.parse(res).logs_lists,
                    info: {
                        total_fuel_cost: JSON.parse(res).total_fuel_cost,
                        total_gallons: JSON.parse(res).total_gallons,
                        total_litres: JSON.parse(res).total_litres,
                    }
                });
            });
    }

}
