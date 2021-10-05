import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderAddTechnicalRoutingModule } from './procurement-tender-add-technical-routing.module';
import { ProcurementTenderAddTechnicalComponent } from './procurement-tender-add-technical.component';
import { QuestionsModule } from '../../../../../../../modules/questions/questions.module';

@NgModule({
    declarations: [
        ProcurementTenderAddTechnicalComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddTechnicalRoutingModule,
        QuestionsModule
    ],
    exports: [
        ProcurementTenderAddTechnicalComponent
    ]
})
export class ProcurementTenderAddTechnicalModule { }
