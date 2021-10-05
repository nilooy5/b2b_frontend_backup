import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnnouncementsCreateComponent} from "./announcements-create.component";

const routes: Routes = [
    {
        path: '',
        component: AnnouncementsCreateComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AnnouncementsCreateRoutingModule { }
