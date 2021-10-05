import {EventEmitter, Injectable, Output} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanLoad,
    Resolve,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment
} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {ShebaHttpService} from "../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../services/storage.service";
import {of} from "rxjs/internal/observable/of";
import {ProfileService} from "../../services/profile.service";
import {PopAlertService} from '../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})

export class DashboardResolveService implements Resolve<Observable<any>>, CanLoad {
    public DashboardBehavior: BehaviorSubject<{ open: boolean }> = new BehaviorSubject({open: true});

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private profileService: ProfileService,
        private pop: PopAlertService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        this.setProfile();
        return this.getBusinessInfo();
    }

    setProfile() {
        if (this.storage.user) {
            return this.profileService.getProfile().toPromise().then(res => {
                if (res.code === 420) {
                    this.storage.removeData();
                    this.router.navigate(['/']).catch(err => {
                        console.log(err);
                    });
                    this.pop.open(res.message);
                }
                this.profileService.setProfileToStorage(res);
            });
        } else {
            return of(null);
        }
    }

    getBusinessInfo() {
        if (this.storage.user) {
            return this.profileService.getBusinessInfo();
        } else {
            return of(null);
        }
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

        const accessAuth = segments.length && segments[0].path === 'auth';
        const accessDashboard = segments.length && segments[0].path === 'dashboard';

        if (this.storage.user && accessAuth) {
            this.router.navigate(['/', 'dashboard']).then(() => {
                this.pop.open('You are already logged in');
            });
        }
        if (!this.storage.user && accessDashboard) {
            this.router.navigate(['/', 'auth']).then(() => {
                this.pop.open('You are not authorized to view this resource. Please login first');
            });
        }

        return true;
    }
}
