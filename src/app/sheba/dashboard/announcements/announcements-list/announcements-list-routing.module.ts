import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsListComponent } from './announcements-list.component';
import { AnnouncementsListService } from './announcements-list.service';

const routes: Routes = [
    {
        path: '',
        component: AnnouncementsListComponent,
        resolve: {
            announcementsList: AnnouncementsListService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AnnouncementsListRoutingModule { }
