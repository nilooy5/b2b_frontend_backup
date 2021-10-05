import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderGeneralComponent } from './tender-general.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import {RouterModule} from '@angular/router';
import {TenderGeneralRoutingModule} from './tender-general-routing.module';
import {TenderListModule} from './tender-list/tender-list.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { TenderDetailsDescriptionComponent } from './tender-details/tender-details-description/tender-details-description.component';
import { TenderDetailsApplyComponent } from './tender-details/tender-details-apply/tender-details-apply.component';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        TenderGeneralComponent,
        TenderDetailsComponent,
        TenderDetailsDescriptionComponent,
        TenderDetailsApplyComponent
    ],
    imports: [
        CommonModule,
        TenderGeneralRoutingModule,
        RouterModule,
        TenderListModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class TenderGeneralModule { }
