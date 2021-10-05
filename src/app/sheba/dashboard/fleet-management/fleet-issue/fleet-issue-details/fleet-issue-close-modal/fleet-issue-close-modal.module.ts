import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FleetIssueCloseModalComponent} from './fleet-issue-close-modal.component';
import {MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';

@NgModule({
    declarations: [
        FleetIssueCloseModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule
    ],
    exports: [
        FleetIssueCloseModalComponent
    ],
    entryComponents: [
        FleetIssueCloseModalComponent
    ]
})
export class FleetIssueCloseModalModule { }
