import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletTransactionsRoutingModule } from './wallet-transactions-routing.module';
import {WalletTransactionsComponent} from './wallet-transactions.component';
import {MatButtonModule, MatIconModule, MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ShebaWidgetsModule} from '../../../modules/sheba-widgets/sheba-widgets.module';
import {WalletTransactionsFilterModule} from './wallet-transactions-filter/wallet-transactions-filter.module';

@NgModule({
    declarations: [
        WalletTransactionsComponent
    ],
    imports: [
        CommonModule,
        WalletTransactionsRoutingModule,
        MatTableModule,
        FormsModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        WalletTransactionsFilterModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class WalletTransactionsModule { }
