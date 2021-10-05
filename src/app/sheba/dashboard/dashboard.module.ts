import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeadersModule} from "../headers/headers.module";
import {DashboardSideBarComponent} from './dashboard-side-bar/dashboard-side-bar.component';
import {CompanyModule} from "./company/company.module";
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {ComingSoonModule} from '../modals/coming-soon/coming-soon.module';
import {BreadcrumbModule} from '../../modules/breadcrumb/breadcrumb.module';
import {RouteNavigationBarModule} from '../../modules/route-navigation-bar/route-navigation-bar.module';
import {MobileViewModalModule} from '../modals/mobile-view-modal/mobile-view-modal.module';
import {FeatureSettingsModule} from '../../modules/feature-settings/feature-settings.module';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardSideBarComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HeadersModule,
        CompanyModule,
        MatIconModule,
        ComingSoonModule,
        MatTooltipModule,
        BreadcrumbModule,
        MobileViewModalModule,
        RouteNavigationBarModule,
        FeatureSettingsModule
    ]
})
export class DashboardModule {
}
