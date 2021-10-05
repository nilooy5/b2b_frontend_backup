import {Injectable} from "@angular/core";
import {FleetInspectionService} from "../../../../../services/fleet-inspection.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ShebaHttpService} from "../../../../../modules/sheba-http/sheba-http.service";
import {FleetService} from "../../../../../services/fleet.service";

@Injectable()
export class FleetInspectionOngoingListResolveService implements Resolve<Observable<any>> {

    constructor(
        private service: FleetInspectionService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getOngoingList();
    }
}

@Injectable()
export class EmployeeResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getEmployees();
    }

    getEmployees(page?: number, limit?: number, filter?: any) {
        return this.service.getEmployees(page, limit, filter);
    }
}

@Injectable()
export class FleetInspectionOngoingDetailsResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetInspectionService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getFleetInspectionOngoingDetails(route.params.inspection_id);
    }

    getFleetInspectionOngoingDetails(inspection_id: number | string) {
        return this.service.getInspectionDetails(inspection_id);
    }

}
