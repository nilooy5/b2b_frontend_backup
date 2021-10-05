import {MatTableDataSource, PageEvent} from "@angular/material";
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PageSizeOptions} from "./constants";
import {Pagination} from "../../types/general";
import {appConfig, AppConfig} from "../../config/app.config";

export interface TableEvents {
    load?: boolean;
    set?: boolean;
    next?: boolean;
    previous?: boolean;
    search?: boolean;
    data?: any;
}

export class TableEssentials {
    limit: number;
    page: number;
    events: BehaviorSubject<TableEvents>;
    data: any[] | any = [];
    dataSource: MatTableDataSource<any[]>;
    pageSizeOptions = PageSizeOptions;
    loadingData: boolean;
    displayColumns: string[] = [];
    filter: any;
    pagination: Pagination;
    appConfig: AppConfig = appConfig;
    searchQuery: string;

    constructor(route: ActivatedRoute, tableKey: string) {
        this.events = new BehaviorSubject({});
        this.filter = {};
        route.data.subscribe(res => {
            this.data = res[tableKey];
            this.events.next({set: true});
        });
    }

    protected tableEvents(): Observable<TableEvents> {
        return this.events.asObservable();
    }

    paginate(page: PageEvent) {
        this.page = page.pageIndex + 1;
        this.limit = page.pageSize;
        this.events.next({load: true});
    }

    filterData(data: any) {
        Object.assign(this.filter, data);
        this.events.next({load: true});
    }

    search() {
        this.filter.query = this.searchQuery;
        this.events.next({load: true});
    }
}
