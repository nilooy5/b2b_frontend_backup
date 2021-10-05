import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqComparisonComponent } from './rfq-comparison.component';
import { RfqComparisonEmptyComponent } from './rfq-comparison-empty/rfq-comparison-empty.component';
import { RfqComparisonTableComponent } from './rfq-comparison-table/rfq-comparison-table.component';
import {MatListModule, MatTableModule} from '@angular/material';
import { RfqComparisonVendorCardComponent } from './rfq-comparison-vendor-card/rfq-comparison-vendor-card.component';
import {RouterModule} from '@angular/router';
import { RfqComparisonVendorListComponent } from './rfq-comparison-vendor-list/rfq-comparison-vendor-list.component';
import {BadgeModule} from '../../../../../modules/badge/badge.module';
import {LimitStringModule} from '../../../../../pipes/limit-string/limit-string.module';

@NgModule({
    declarations: [
        RfqComparisonComponent,
        RfqComparisonEmptyComponent,
        RfqComparisonTableComponent,
        RfqComparisonVendorCardComponent,
        RfqComparisonVendorListComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatListModule,
        RouterModule,
        BadgeModule,
        LimitStringModule.forRoot(),
    ]
})

export class RfqComparisonModule { }
