import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssignmentDetailsRoutingModule} from './assignment-details-routing.module';
import {AssignmentDetailsComponent} from './assignment-details.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import {ShebaPipesModule} from "../../../../../pipes/sheba-pipes/sheba-pipes.module";
import {CommentsModule} from "../../../../../modules/comments/comments.module";

@NgModule({
    declarations: [AssignmentDetailsComponent],
    imports: [
        CommonModule,
        AssignmentDetailsRoutingModule,
        LazyLoadImageModule.forRoot({}),
        ShebaPipesModule,
        CommentsModule
    ]
})
export class AssignmentDetailsModule {
}
