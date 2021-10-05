import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from "./announcements.component";

const routes: Routes = [
    {
        path: '',
        component: AnnouncementsComponent,
        children: [
            {
                path: '',
                loadChildren: './announcements-list/announcements-list.module#AnnouncementsListModule'
            },
            {
                path: 'create',
                loadChildren: './announcements-create/announcements-create.module#AnnouncementsCreateModule'
            },
            {
                path: ':announcement_id',
                loadChildren: './announcements-details/announcements-details.module#AnnouncementsDetailsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AnnouncementsRoutingModule { }
