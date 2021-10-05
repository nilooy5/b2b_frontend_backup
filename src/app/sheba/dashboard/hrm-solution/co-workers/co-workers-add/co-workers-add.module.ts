import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoWorkersAddComponent } from './co-workers-add.component';
import { CoWorkersAddBasicComponent } from './co-workers-add-basic/co-workers-add-basic.component';
import {RouterModule} from '@angular/router';
import {CoWorkersAddRoutingModule} from './co-workers-add-routing.module';
import { CoWorkersAddOfficialComponent } from './co-workers-add-official/co-workers-add-official.component';
import { CoWorkersAddPersonalComponent } from './co-workers-add-personal/co-workers-add-personal.component';
import { CoWorkersAddFinancialComponent } from './co-workers-add-financial/co-workers-add-financial.component';
import { CoWorkersAddEmergencyComponent } from './co-workers-add-emergency/co-workers-add-emergency.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import { CoWorkersConfirmationMessageComponent } from './co-workers-confirmation-message/co-workers-confirmation-message.component';
import {MatDatepickerModule, MatDialogModule, MatInputModule} from '@angular/material';
import {DialogCoWorkersBasicConfirmComponent} from '../modals/dialog-co-workers-basic-confirm/dialog-co-workers-basic-confirm.component';

@NgModule({
    declarations: [
        CoWorkersAddComponent,
        CoWorkersAddBasicComponent,
        CoWorkersAddOfficialComponent,
        CoWorkersAddPersonalComponent,
        CoWorkersAddFinancialComponent,
        CoWorkersAddEmergencyComponent,
        CoWorkersConfirmationMessageComponent,
        DialogCoWorkersBasicConfirmComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoWorkersAddRoutingModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatDialogModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            space: -12,
            maxPercent: 100,
            titleFontSize: '32',
            titleFontWeight: '700',
            unitsFontSize: '15',
            unitsFontWeight: '700',
            showSubtitle: false,
            startFromZero: false,
            renderOnClick: false
        }),
    ],
    entryComponents: [ DialogCoWorkersBasicConfirmComponent ]
})

export class CoWorkersAddModule { }
