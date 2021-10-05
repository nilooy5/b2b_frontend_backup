import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderAddCompanyComponent } from './procurement-tender-add-company.component';
import { ProcurementTenderAddCompanyRoutingModule } from './procurement-tender-add-company-routing.module';
import { QuestionsModule } from '../../../../../../../modules/questions/questions.module';

@NgModule({
    declarations: [
        ProcurementTenderAddCompanyComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddCompanyRoutingModule,
        QuestionsModule
    ],
    exports: [
        ProcurementTenderAddCompanyComponent
    ]
})
export class ProcurementTenderAddCompanyModule { }
