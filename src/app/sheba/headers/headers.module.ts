import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHeaderComponent} from './main-header/main-header.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DashboardHeaderComponent} from './dashboard-header/dashboard-header.component';
import {MatBadgeModule, MatIconModule, MatMenuModule} from '@angular/material';
import {JourneyHeaderComponent} from "./journey-header/journey-header.component";
import {NotificationsModule} from '../dashboard/notifications/notifications.module';
import {BadgeModule} from '../../modules/badge/badge.module';

@NgModule({
    declarations: [
        MainHeaderComponent,
        DashboardHeaderComponent,
        JourneyHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatMenuModule,
        MatIconModule,
        NotificationsModule,
        MatBadgeModule,
        BadgeModule
    ],
    exports: [
        MainHeaderComponent,
        DashboardHeaderComponent,
        JourneyHeaderComponent
    ]
})
export class HeadersModule {
}
