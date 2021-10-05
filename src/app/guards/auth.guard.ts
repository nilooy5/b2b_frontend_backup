import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {PopAlertService} from '../modules/pop-alert/pop-alert.service';
import {User} from '../types/users';
import {delay} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    private user: User = null;
    private userIsSuper = false;

    constructor(
        private storage: StorageService,
        private router: Router,
        private pop: PopAlertService,
    ) {
        this.user = this.storage.user || null;
        this.userIsSuper = this.storage.user ? !!this.user.is_super : false;
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.user) {
            if (next.routeConfig.path === 'vehicle' && !this.userIsSuper) {
                this.router.navigate(['/', 'dashboard', 'fleet-management', 'requests']).catch(err => {
                    console.log(err);
                });
                return false;
            }

            console.log(next.routeConfig.path);
            // check if route has user access check
            if (next.data.userAccess === false) {
                // role not super admin so redirect to home page
                if (this.userIsSuper) {
                    return true;
                } else {
                    this.pop.open('Unauthorized Access.');

                    this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                        console.log(err);
                    });
                    return false;
                }
            }

            // authorised so return true
            return true;
        }

        return false;
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (this.user) {
            const vehicleSegment = segments.find((data) => {
                return data.path === 'vehicle';
            });
            if (vehicleSegment && !this.userIsSuper) {
                this.router.navigate(['/', 'dashboard', 'fleet-management', 'requests']).catch(err => {
                    console.log(err);
                });
                return false;
            }

            // check if route has user access check
            if (!route.data.userAccess) {
                // role not super admin so redirect to home page
                if (this.userIsSuper) {
                    return true;
                } else {
                    of(this.user).pipe(delay(1000)).subscribe(res => {
                        this.pop.open('Unauthorized Access.');
                    });
                    this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                        console.log(err);
                    });
                    return false;
                }
            }
            // authorised so return true
            return true;
        }
        return false;
    }
}
