import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AssignmentDetailsComponent} from "./assignment-details.component";

const routes: Routes = [
    {
        path: '',
        component: AssignmentDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignmentDetailsRoutingModule {
}
