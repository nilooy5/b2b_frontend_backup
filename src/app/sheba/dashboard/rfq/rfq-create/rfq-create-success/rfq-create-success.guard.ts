import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RfqCreateSuccessGuard implements CanActivate {

    constructor(private router: Router,
                private pop: PopAlertService) { }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const publishType = activatedRouteSnapshot.queryParamMap.get('publish');

        if (publishType !== null) {
            return true;
        }
        this.router.navigate(['/', 'dashboard', 'rfq', 'create']).then(() => {
            this.pop.open('No publish type was found');
        });
    }
}
