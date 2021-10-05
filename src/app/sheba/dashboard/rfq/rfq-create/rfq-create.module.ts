import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqCreateComponent } from './rfq-create.component';
import { MatButtonModule} from '@angular/material/button';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RfqCreateEvaluationTechnicalComponent } from './rfq-create-evaluation-technical/rfq-create-evaluation-technical.component';
import { RfqCreateEvaluationCompanyComponent } from './rfq-create-evaluation-company/rfq-create-evaluation-company.component';
import { RfqCreatePriceQuotationComponent } from './rfq-create-price-quotation/rfq-create-price-quotation.component';
import { RfqCreateSuccessComponent } from './rfq-create-success/rfq-create-success.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RfqCreateGeneralModule } from './rfq-create-general/rfq-create-general.module';
import { RfqCreateRoutingModule } from './rfq-create-routing.module';
import { EditableTableInlineModule } from '../../../../modules/editable-table-inline/editable-table-inline.module';
import { QuestionsModule } from '../../../../modules/questions/questions.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmModalModule } from '../../../modals/confirm-modal/confirm-modal.module';
import { LoadingModalModule } from '../../../modals/loading-modal/loading-modal.module';
import {ShareModule} from '@ngx-share/core';

@NgModule({
    declarations: [
        RfqCreateComponent,
        RfqCreateEvaluationTechnicalComponent,
        RfqCreateEvaluationCompanyComponent,
        RfqCreatePriceQuotationComponent,
        RfqCreateSuccessComponent,
    ],
    imports: [
        CommonModule,
        RfqCreateRoutingModule,
        RfqCreateGeneralModule,
        MatButtonModule,
        NgbPopoverModule,
        ReactiveFormsModule,
        NgbModule,
        EditableTableInlineModule,
        QuestionsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        ConfirmModalModule,
        LoadingModalModule,
        ShareModule.forRoot()
    ]
})

export class RfqCreateModule { }
