import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {FleetService} from "../../../../services/fleet.service";

@Injectable({
    providedIn: 'root'
})
export class FleetRequestService {

    constructor() {
    }
}

@Injectable()
export class FleetRequestsResolveService implements Resolve<Observable<any>> {
    constructor(private service: FleetService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.vehicleRequests();
    }

}

@Injectable()
export class FleetRequestDetailsResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getTripRequestDetails(route.params.request_id);
    }

}
