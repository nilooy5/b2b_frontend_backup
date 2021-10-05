/* tslint:disable:no-trailing-whitespace */
import {Injectable} from '@angular/core';
import {ProcurementWorkorderService} from './procurement-workorder.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ProcurementWorkorderDetailsResolverService {

    order_id: any;
    bid_id: any;

    constructor(private procurementWorkorderService: ProcurementWorkorderService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        this.bid_id = route.parent.parent.queryParams.bid;
        this.order_id = route.parent.parent.params.order_id;
        return forkJoin([
            this.procurementWorkorderService.getWorkorderDetails(this.order_id, this.bid_id)
        ]).pipe(map((result) => {
            const [{work_order}] = result;
            return { work_order };
        }));
    }
}
