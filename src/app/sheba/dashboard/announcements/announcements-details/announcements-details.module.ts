import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsDetailsComponent } from './announcements-details.component';
import {AnnouncementsDetailsRoutingModule} from "./announcements-details-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from "@angular/material";
import {ConfirmMessageModule} from "../../fleet-management/confirm-message/confirm-message.module";
import {AngularEditorModule} from '@kolkov/angular-editor';
import {NgxSummernoteModule} from 'ngx-summernote';

@NgModule({
    declarations: [AnnouncementsDetailsComponent],
    imports: [
        CommonModule,
        AnnouncementsDetailsRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ConfirmMessageModule,
        AngularEditorModule,
        NgxSummernoteModule
    ]
})
export class AnnouncementsDetailsModule { }
