import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqCreateGeneralComponent } from './rfq-create-general.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RfqCreateBasicInfoComponent } from './rfq-create-basic-info/rfq-create-basic-info.component';
import { RfqCreateAdditionalInfoComponent } from './rfq-create-additional-info/rfq-create-additional-info.component';
import { RfqCreateAdvanceSummaryComponent } from './rfq-create-advance-summary/rfq-create-advance-summary.component';
import { RfqCreateAdvanceOptionsComponent } from './rfq-create-advance-options/rfq-create-advance-options.component';
import { RfqCreateAttachmentComponent } from './rfq-create-attachment/rfq-create-attachment.component';
import { RfqCreateScoreComponent } from './rfq-create-score/rfq-create-score.component';
import { RfqCreateTagsComponent } from './rfq-create-basic-info/rfq-create-tags/rfq-create-tags.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MaterialDateRangePickerModule} from '../../../../../modules/material-date-range-picker/material-date-range-picker.module';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {RouterModule} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
    declarations: [
        RfqCreateGeneralComponent,
        RfqCreateBasicInfoComponent,
        RfqCreateAdditionalInfoComponent,
        RfqCreateAdvanceSummaryComponent,
        RfqCreateAdvanceOptionsComponent,
        RfqCreateAttachmentComponent,
        RfqCreateScoreComponent,
        RfqCreateTagsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatAutocompleteModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            space: -12,
            maxPercent: 100,
            titleFontSize: '32',
            titleFontWeight: '600',
            showSubtitle: false,
            showUnits: false,
            startFromZero: false,
        }),
        MatCheckboxModule,
        MatExpansionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MaterialDateRangePickerModule,
        MatTableModule,
        MatRadioModule,
        RouterModule,
        NgSelectModule
    ]
})

export class RfqCreateGeneralModule { }
