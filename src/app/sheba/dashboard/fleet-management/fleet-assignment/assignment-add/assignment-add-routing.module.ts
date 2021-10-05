import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AssignmentAddComponent} from "./assignment-add.component";

const routes: Routes = [
    {
        path: '',
        component: AssignmentAddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignmentAddRoutingModule {
}
