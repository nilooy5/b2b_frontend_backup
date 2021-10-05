import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsDetailsComponent } from "./announcements-details.component";
import { AnnouncementsDetailsService } from "./announcements-details.service";

const routes: Routes = [
    {
        path: '',
        component: AnnouncementsDetailsComponent,
        resolve: {
            announcement: AnnouncementsDetailsService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AnnouncementsDetailsRoutingModule { }
