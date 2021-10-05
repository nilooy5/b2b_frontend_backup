import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupportListComponent} from './support-list.component';
import {SupportListRoutingModule} from './support-list-routing.module';
import {MatTableModule} from '@angular/material';
import { SupportListFilterComponent } from './support-list-filter/support-list-filter.component';
import {DateRangePickerModule} from '../../../../modules/date-range-picker/date-range-picker.module';
import {FormsModule} from '@angular/forms';
import { SupportStatusPipe } from './support-status.pipe';

@NgModule({
    declarations: [
        SupportListComponent,
        SupportListFilterComponent,
        SupportStatusPipe
    ],
    imports: [
        CommonModule,
        SupportListRoutingModule,
        MatTableModule,
        DateRangePickerModule,
        FormsModule
    ]
})
export class SupportListModule { }
