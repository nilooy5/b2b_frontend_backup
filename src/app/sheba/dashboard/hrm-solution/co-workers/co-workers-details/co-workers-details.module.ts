import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoWorkersDetailsComponent } from './co-workers-details.component';
import {BadgeModule} from '../../../../../modules/badge/badge.module';
import {RouterModule} from '@angular/router';
import {CoWorkersDetailsRoutingModule} from './co-workers-details-routing.module';
import { CoWorkersDetailsBasicComponent } from './co-workers-details-basic/co-workers-details-basic.component';
import { CoWorkersDetailsOfficialComponent } from './co-workers-details-official/co-workers-details-official.component';
import { CoWorkersDetailsPersonalComponent } from './co-workers-details-personal/co-workers-details-personal.component';
import { CoWorkersDetailsFinancialComponent } from './co-workers-details-financial/co-workers-details-financial.component';
import { CoWorkersDetailsEmergencyComponent } from './co-workers-details-emergency/co-workers-details-emergency.component';
import { CoWorkersDetailsHeaderComponent } from './co-workers-details-header/co-workers-details-header.component';
import {MatButtonModule, MatDividerModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
      CoWorkersDetailsComponent,
      CoWorkersDetailsBasicComponent,
      CoWorkersDetailsOfficialComponent,
      CoWorkersDetailsPersonalComponent,
      CoWorkersDetailsFinancialComponent,
      CoWorkersDetailsEmergencyComponent,
      CoWorkersDetailsHeaderComponent
  ],
    imports: [
        CommonModule,
        BadgeModule,
        RouterModule,
        CoWorkersDetailsRoutingModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule
    ]
})
export class CoWorkersDetailsModule { }
