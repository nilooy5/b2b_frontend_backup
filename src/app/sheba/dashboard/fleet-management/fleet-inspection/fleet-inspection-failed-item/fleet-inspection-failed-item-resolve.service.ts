import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {FleetInspectionService} from "../../../../../services/fleet-inspection.service";

@Injectable()
export class FleetInspectionFailedItemResolveService implements Resolve<Observable<any>> {
    constructor(
        private service: FleetInspectionService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.service.getFailedItemsList();
    }

}
