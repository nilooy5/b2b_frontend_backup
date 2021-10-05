import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteNavigationBarComponent } from './route-navigation-bar.component';
import {RouterModule} from '@angular/router';
import {MatTabsModule} from '@angular/material';

@NgModule({
    declarations: [RouteNavigationBarComponent],
    exports: [
        RouteNavigationBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatTabsModule
    ]
})
export class RouteNavigationBarModule { }
