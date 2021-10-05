import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoWorkersListComponent} from './co-workers-list.component';
import {CoWorkersListFilterComponent} from './co-workers-list-filter/co-workers-list-filter.component';
import {CoWorkersListBreadcrumbComponent} from './co-workers-list-breadcrumb/co-workers-list-breadcrumb.component';
import {RouterModule} from '@angular/router';
import {MatTableModule, MatDatepickerModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatSortModule, MatDividerModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BadgeModule} from 'src/app/modules/badge/badge.module';
import {DialogConfirmComponent} from '../modals/dialog-confirm/dialog-confirm.component';
import {DialogInviteCoWorkerComponent} from '../modals/dialog-invite-co-worker/dialog-invite-co-worker.component';
import {FormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {DialogInvitationSentComponent} from '../modals/dialog-invitation-sent/dialog-invitation-sent.component';

@NgModule({
    declarations: [
        CoWorkersListComponent,
        CoWorkersListFilterComponent,
        CoWorkersListBreadcrumbComponent,
        DialogConfirmComponent,
        DialogInviteCoWorkerComponent,
        DialogInvitationSentComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        MatIconModule,
        MatButtonModule,
        NgbTooltipModule,
        MatTableModule,
        BadgeModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSortModule,
        MatDividerModule,
        MatInputModule,
        TagInputModule
    ],
    entryComponents: [
        DialogConfirmComponent,
        DialogInviteCoWorkerComponent,
        DialogInvitationSentComponent
    ]
})

export class CoWorkersListModule {
}
