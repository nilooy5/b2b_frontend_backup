import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssignmentListRoutingModule} from './assignment-list-routing.module';
import {AssignmentListComponent} from './assignment-list.component';
import {MatTableModule} from "@angular/material";
import {ShebaWidgetsModule} from "../../../../../modules/sheba-widgets/sheba-widgets.module";
import {FormsModule} from "@angular/forms";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {AssignmentListFilterModule} from "./assignment-list-filter/assignment-list-filter.module";

@NgModule({
    declarations: [
        AssignmentListComponent
    ],
    imports: [
        CommonModule,
        AssignmentListRoutingModule,
        MatTableModule,
        ShebaWidgetsModule,
        FormsModule,
        LazyLoadImageModule.forRoot({}),
        AssignmentListFilterModule
    ]
})
export class AssignmentListModule {
}
