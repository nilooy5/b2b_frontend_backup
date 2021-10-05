import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveSettingsRoutingModule } from './leave-settings-routing.module';
import { LeaveSettingsComponent } from './leave-settings.component';
import { LeaveSettingsTypeComponent } from './leave-settings-type/leave-settings-type.component';
import { LeaveSettingsOthersComponent } from './leave-settings-others/leave-settings-others.component';
import { LeaveSettingsTypeBreadcrumbComponent } from './leave-settings-type/leave-settings-type-breadcrumb/leave-settings-type-breadcrumb.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {NotifyModalComponent} from './modals/notify-modal/notify-modal.component';
import {NgbAlertModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {LoadingModalModule} from '../../../modals/loading-modal/loading-modal.module';
import {LeaveSettingsOthersEditComponent} from './leave-settings-others/leave-settings-others-edit/leave-settings-others-edit.component';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
    declarations: [
        LeaveSettingsComponent,
        LeaveSettingsTypeComponent,
        LeaveSettingsOthersComponent,
        LeaveSettingsOthersEditComponent,
        LeaveSettingsTypeBreadcrumbComponent,
        NotifyModalComponent
    ],
    imports: [
        CommonModule,
        LeaveSettingsRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule,
        NgbAlertModule,
        LoadingModalModule,
        NgbTooltipModule,
        NgSelectModule
    ],
    entryComponents: [NotifyModalComponent]
})

export class LeaveSettingsModule { }
