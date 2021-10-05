import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Breadcrumb, NavLink, SettingsItem} from '../types/general';

@Injectable({
    providedIn: 'root'
})

export class DashboardSharedService {

    private breadcrumbSource = new Subject<any>();
    currentBreadcrumb = this.breadcrumbSource.asObservable();

    private routeNavigationSource = new Subject<any>();
    currentRouteNavigation = this.routeNavigationSource.asObservable();

    private headerTitleSource = new Subject<string>();
    currentHeaderTitle = this.headerTitleSource.asObservable();

    private featureSettingsSource = new Subject<any>();
    currentFeatureSettings = this.featureSettingsSource.asObservable();

    constructor() { }

    changeBreadcrumb(showBreadcrumb: boolean, breadcrumb?: Breadcrumb[], htmlMarkup?: any) {
        this.breadcrumbSource.next({showBreadcrumb, breadcrumb, htmlMarkup});
    }

    changeRouteNavigation(showNavigation: boolean, navLinks?: NavLink[], htmlMarkup?: any) {
        this.routeNavigationSource.next({showNavigation, navLinks, htmlMarkup});
    }

    changeHeaderTitle(title: string) {
        this.headerTitleSource.next(title);
    }

    changeFeatureSettings(showFeatureSettings: boolean, settingsTitle?: string, settingsItems?: SettingsItem[]) {
        this.featureSettingsSource.next({showFeatureSettings, settingsTitle, settingsItems});
    }

}
