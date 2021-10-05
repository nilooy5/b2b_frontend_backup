import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqDetailsGeneralComponent } from './rfq-details-general.component';
import { RfqDetailsGeneralRoutingModule } from './rfq-details-general-routing.module';
import { RfqDetailsComponent } from './rfq-details/rfq-details.component';
import { RfqBiddingsComponent } from './rfq-biddings/rfq-biddings.component';
import { RfqInvitationsComponent } from './rfq-invitations/rfq-invitations.component';
import { RfqHiringHistoryComponent } from './rfq-hiring-history/rfq-hiring-history.component';
import { RfqComparisonModule } from './rfq-comparison/rfq-comparison.module';
import {RfqFooterHelpModule} from '../rfq-footer-help/rfq-footer-help.module';
import { RfqQuotationComponent } from './rfq-quotation/rfq-quotation.component';
import { RfqHireComponent } from './rfq-hire/rfq-hire.component';
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule, MatSelectModule, MatTableModule} from '@angular/material';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {RfqEditGeneralInfoModule} from './rfq-details/rfq-details-show/rfq-edit-general-info/rfq-edit-general-info.module';
import {MaterialDateRangePickerModule} from '../../../../modules/material-date-range-picker/material-date-range-picker.module';
import {ReactiveFormsModule} from '@angular/forms';
import { RfqShareDialogComponent } from './rfq-share-dialog/rfq-share-dialog.component';
import { RfqDetailsShowComponent } from './rfq-details/rfq-details-show/rfq-details-show.component';
import {RfqHireBasicComponent} from './rfq-hire/rfq-hire-basic/rfq-hire-basic.component';
import {RfqHireAdvanceComponent} from './rfq-hire/rfq-hire-advance/rfq-hire-advance.component';
import { RfqDetailsEditPriceComponent } from './rfq-details/rfq-details-edit-price/rfq-details-edit-price.component';
import { RfqDetailsEditTechnicalComponent } from './rfq-details/rfq-details-edit-technical/rfq-details-edit-technical.component';
import { RfqDetailsEditCompanyComponent } from './rfq-details/rfq-details-edit-company/rfq-details-edit-company.component';
import {ShareModule} from '@ngx-share/core';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {LimitStringModule} from '../../../../pipes/limit-string/limit-string.module';
import {RfqDetailsShowAdvancedComponent} from './rfq-details/rfq-details-show/rfq-details-show-advanced/rfq-details-show-advanced.component';
import {QuestionsModule} from '../../../../modules/questions/questions.module';
import {EditableTableInlineModule} from '../../../../modules/editable-table-inline/editable-table-inline.module';
import {ConfirmModalModule} from '../../../modals/confirm-modal/confirm-modal.module';
import {LoadingModalModule} from '../../../modals/loading-modal/loading-modal.module';

@NgModule({
    declarations: [
        RfqDetailsGeneralComponent,
        RfqDetailsComponent,
        RfqBiddingsComponent,
        RfqInvitationsComponent,
        RfqHiringHistoryComponent,
        RfqQuotationComponent,
        RfqHireComponent,
        RfqShareDialogComponent,
        RfqDetailsShowComponent,
        RfqHireBasicComponent,
        RfqHireAdvanceComponent,
        RfqDetailsEditPriceComponent,
        RfqDetailsEditTechnicalComponent,
        RfqDetailsEditCompanyComponent,
        RfqDetailsShowAdvancedComponent
    ],
    imports: [
        CommonModule,
        RfqComparisonModule,
        RfqDetailsGeneralRoutingModule,
        RfqFooterHelpModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatDividerModule,
        NgbAlertModule,
        RfqEditGeneralInfoModule,
        MatTableModule,
        MaterialDateRangePickerModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        ShareModule.forRoot(),
        QuestionsModule,
        EditableTableInlineModule,
        MatRadioModule,
        MatCheckboxModule,
        ConfirmModalModule,
        LoadingModalModule,
        AngularEditorModule
    ],
    entryComponents: [ RfqShareDialogComponent ]
})

export class RfqDetailsGeneralModule { }
