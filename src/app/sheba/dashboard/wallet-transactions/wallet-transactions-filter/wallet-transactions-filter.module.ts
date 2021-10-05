import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WalletTransactionsFilterComponent} from './wallet-transactions-filter.component';
import {DateRangePickerModule} from '../../../../modules/date-range-picker/date-range-picker.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ShebaPipesModule} from '../../../../pipes/sheba-pipes/sheba-pipes.module';

@NgModule({
    declarations: [
        WalletTransactionsFilterComponent
    ],
    imports: [
        CommonModule,
        DateRangePickerModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        WalletTransactionsFilterComponent
    ]
})
export class WalletTransactionsFilterModule { }
