import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of, pipe} from "rxjs";
import {ShebaHttpService} from "../modules/sheba-http/sheba-http.service";
import {StorageService} from "./storage.service";
import {VehicleListService} from "../sheba/dashboard/fleet-management/vehicle/vehicle-list.service";
import {listFilters} from "../helpers/functions";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FleetService implements Resolve<Observable<any>> {
    member_id: number;
    business_id: number;
    request_id: number;

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.member_id = this.storage.user.member_id;
        this.business_id = this.storage.user.business_id;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (route.params.driver_id) {
            return this.getDriver(route.params.driver_id);
        } else {
            return this.getDrivers();
        }
    }

    getDrivers(page?: number, limit?: number, filter?: any) {
        const query = listFilters(page, limit, filter);
        return this.http.get('v2/members/' + this.member_id + '/drivers' + query).pipe(catchError(res => {
            return of([])
        }), map(res => res.code === 200 ? res.driver_lists : []));
    }

    getDriver(id: number | string) {
        return this.http.get('v2/members/' + this.member_id + '/drivers/' + id);
    }

    getAssignments(page?: number, limit?: number, filter?: any) {
        const filters = listFilters(page, limit, filter);
        return this.http.get('v2/members/' + this.member_id + '/trips' + filters).pipe(catchError(err => {
            return of([])
        }), map(res => {
            return res.code === 200 ? res.trips : [];
        }));
    }

    getMembers() {
        return this.http.get('v2/businesses/' + this.business_id + '/members');
    }

    getVehicles(page?: number, limit?: number, filter?: any) {
        const extra = listFilters(null, null, filter);
        return this.http.get('v2/members/' + this.member_id + '/vehicles' + extra).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.vehicle_lists;
        }));
    }

    vehicleRequest(data: any) {
        return this.http.post('v2/members/' + this.member_id + '/trip-requests', data)
    }

    vehicleRequests(page?: number, limit?: number, filter?: any) {
        let data = listFilters(page, limit, filter);
        return this.http.get('v2/members/' + this.member_id + '/trip-requests' + data).pipe(catchError(err => {
            return of([])
        }), map(res => {
            return res.code === 200 ? res.trip_requests : [];
        }));
    }

    tripApprovalList(page?: number, limit?: number, filter?: any) {
        let data = listFilters(page, limit, filter);
        return this.http.get('v2/members/' + this.member_id + '/trip-request-approval' + data).pipe(catchError(err => {
            return of([])
        }), map(res => {
            return res.code === 200 ? res.request_approvals : [];
        }));
    }

    getTripRequestDetails(id: string | number) {
        return this.http.get('v2/members/' + this.member_id + '/trip-requests/' + id).pipe(catchError(res => {
            return of(null);
        }), map(res => {
            return res.code === 200 ? res.info : null;
        }))
    }

    getTripDetails(id: string | number) {
        return this.http.get('v2/members/' + this.member_id + '/trips/' + id).pipe(catchError(res => {
            return of(null);
        }), map(res => {
            return res.code === 200 ? res.info : null;
        }));
    }

    getBusinessTrips(page?: number, limit?: number, filter?: any) {
        const data = listFilters(page, limit, filter);
        return this.http.get('v2/businesses/' + this.business_id + '/trips' + data).pipe(catchError(res => {
            return of([]);
        }), map(res => res.code === 200 ? res.data : []));
    }

    postTrip(data: any) {
        return this.http.post('v2/members/' + this.member_id + '/trips', data);
    }

    getEmployees(page?: number, limit?: number, filter?: any) {
        const listFilter = listFilters(page, limit, filter);
        return this.http.get('v2/businesses/' + this.business_id + '/employees' + listFilter).pipe(catchError(_ => {
            return of({});
        }), map(res => res.code === 200 ? res.employees : []))
    }
}

@Injectable()
export class FleetDriverResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (route.params.driver_id) {
            return this.service.getDriver(route.params.driver_id);
        } else {
            if (route.parent.data.tripRequest) {
                return this.service.getDrivers(null, null, {
                    start_date: route.parent.data.tripRequest.start_date,
                    trip_request_id: route.parent.data.tripRequest.id
                });
            }
            return this.service.getDrivers();
        }
    }

}
