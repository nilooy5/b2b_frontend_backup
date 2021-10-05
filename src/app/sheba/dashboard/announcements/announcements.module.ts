import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from "./announcements.component";
import { AnnouncementsRoutingModule } from "./announcements-routing.module";

@NgModule({
    declarations: [
        AnnouncementsComponent
    ],
    imports: [
        CommonModule,
        AnnouncementsRoutingModule
    ]
})

export class AnnouncementsModule { }
