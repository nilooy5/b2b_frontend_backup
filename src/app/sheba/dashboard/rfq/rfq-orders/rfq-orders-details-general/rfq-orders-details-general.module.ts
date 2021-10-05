import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RfqOrdersDetailsGeneralComponent } from './rfq-orders-details-general.component';
import { RfqOrdersDetailsComponent } from './rfq-orders-details/rfq-orders-details.component';
import { RfqOrdersBillComponent } from './rfq-orders-bill/rfq-orders-bill.component';
import { RfqOrdersWorkorderComponent } from './rfq-orders-workorder/rfq-orders-workorder.component';
import { RfqOrdersTimelineComponent } from './rfq-orders-timeline/rfq-orders-timeline.component';
import {MatButtonModule} from '@angular/material/button';
import {ShebaPaymentModule} from '../../../../../modules/sheba-payment/sheba-payment.module';
import {MatTableModule} from "@angular/material/table";
import { RfqOrdersDetailsGeneralInfoComponent } from './rfq-orders-details/rfq-orders-details-general-info/rfq-orders-details-general-info.component';
import { RfqOrdersDetailsDocumentsComponent } from './rfq-orders-details/rfq-orders-details-documents/rfq-orders-details-documents.component';
import { RfqOrdersDetailsDescriptionComponent } from './rfq-orders-details/rfq-orders-details-description/rfq-orders-details-description.component';
import { RfqOrdersDetailsQuotationComponent } from './rfq-orders-details/rfq-orders-details-quotation/rfq-orders-details-quotation.component';
import {RfqOrdersBillPaymentsComponent} from './rfq-orders-bill-payments/rfq-orders-bill-payments.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
    declarations: [
        RfqOrdersDetailsGeneralComponent,
        RfqOrdersDetailsComponent,
        RfqOrdersBillComponent,
        RfqOrdersWorkorderComponent,
        RfqOrdersTimelineComponent,
        RfqOrdersDetailsGeneralInfoComponent,
        RfqOrdersDetailsDocumentsComponent,
        RfqOrdersDetailsDescriptionComponent,
        RfqOrdersDetailsQuotationComponent,
        RfqOrdersBillPaymentsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        ShebaPaymentModule,
        MatTableModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})

export class RfqOrdersDetailsGeneralModule { }
