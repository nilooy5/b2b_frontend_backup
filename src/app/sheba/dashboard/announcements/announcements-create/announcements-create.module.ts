import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsCreateComponent } from './announcements-create.component';
import {AnnouncementsCreateRoutingModule} from "./announcements-create-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from "@angular/material";
import {ConfirmMessageModule} from "../../fleet-management/confirm-message/confirm-message.module";
import {AngularEditorModule} from '@kolkov/angular-editor';
import {NgxSummernoteModule} from 'ngx-summernote';

@NgModule({
    declarations: [AnnouncementsCreateComponent],
    imports: [
        CommonModule,
        AnnouncementsCreateRoutingModule,
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
export class AnnouncementsCreateModule { }
