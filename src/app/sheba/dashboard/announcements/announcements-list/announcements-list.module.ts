import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsListComponent } from './announcements-list.component';
import { AnnouncementsListRoutingModule } from "./announcements-list-routing.module";
import { AnnouncementsListFilterComponent } from './announcements-list-filter/announcements-list-filter.component';
import { MatTableModule } from "@angular/material";
import { DateRangePickerModule } from "../../../../modules/date-range-picker/date-range-picker.module";
import { FormsModule } from "@angular/forms";
import { AnnouncementColorPipe } from './announcement-color.pipe';

@NgModule({
    declarations: [
        AnnouncementsListComponent,
        AnnouncementsListFilterComponent,
        AnnouncementColorPipe
    ],
    imports: [
        CommonModule,
        AnnouncementsListRoutingModule,
        MatTableModule,
        DateRangePickerModule,
        FormsModule
    ]
})

export class AnnouncementsListModule { }
