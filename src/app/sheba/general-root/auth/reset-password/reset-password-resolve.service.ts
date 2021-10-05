import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordResolveService implements CanActivate {

    constructor(
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!route.queryParams.code) {
            this.router.navigate(['/', 'auth']).catch(err => {
                console.log(err);
            });
            return false;
        }
        return true;
    }
}
