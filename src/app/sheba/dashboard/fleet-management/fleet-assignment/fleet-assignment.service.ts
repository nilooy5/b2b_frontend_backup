import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {FleetService} from "../../../../services/fleet.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FleetAssignmentService implements Resolve<Observable<any>> {

    constructor(
        private service: FleetService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getAssignments();
    }
}

@Injectable()
export class FleetUserResolveService implements Resolve<Observable<any>> {
    constructor(private service: FleetService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getMembers().pipe(catchError(res => {
            return of([]);
        }), map(res => {
            if (res && res.code === 200) {
                return res.members;
            } else {
                return [];
            }
        }));
    }
}

@Injectable()
export class FleetVehicleResolveService implements Resolve<Observable<any>> {
    constructor(private service: FleetService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (route.parent.data.tripRequest) {
            return this.service.getVehicles(null, null, {
                start_date: route.parent.data.tripRequest.start_date,
                trip_request_id: route.parent.data.tripRequest.id
            })
        }
        return this.service.getVehicles();
    }
}

@Injectable()
export class FleetAssignmentDetailsResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getTripDetails(route.params.request_id);
    }

}

@Injectable()
export class FleetTripRequestDetailsResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getTripRequestDetails(route.params.request_id);
    }

}


