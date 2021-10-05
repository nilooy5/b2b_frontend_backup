import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CoWorkerStorageService} from '../../../../../services/co-workers-storage-service/co-worker-storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})
export class CoWorkersAddGuard implements CanActivate {

    constructor(private coWorkerStorageService: CoWorkerStorageService,
                private pop: PopAlertService,
                private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const coworkerIdFromStorage = this.coWorkerStorageService.CoworkerId;
        const coworkerIdFromQueryParams = next.queryParams && next.queryParams.coworkerId;
        if (coworkerIdFromStorage || coworkerIdFromQueryParams) {
            return true;
        } else {
            this.router.navigate(['/', 'dashboard', 'co-workers', 'add', 'basic']).then(() => {
                this.pop.open(`You need to add co-worker's Basic Information first`);
            });
        }
    }

}
