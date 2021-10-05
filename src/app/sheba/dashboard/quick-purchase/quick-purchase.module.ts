import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickPurchaseRoutingModule } from './quick-purchase-routing.module';
import { QuickPurchaseComponent } from './quick-purchase.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ServiceCartModule } from './service-cart/service-cart.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
    declarations: [
        QuickPurchaseComponent
    ],
    imports: [
        CommonModule,
        QuickPurchaseRoutingModule,
        MatButtonModule,
        ServiceCartModule,
        MatProgressBarModule,
        MatIconModule
    ]
})
export class QuickPurchaseModule {

}
