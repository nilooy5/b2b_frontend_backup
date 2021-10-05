import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestFormDetailComponent} from "./purchase-request-form-detail.component";
import { PurchaseRequestFormDetailRoutingModule} from "./purchase-request-detail-routing.module";

@NgModule({
    declarations: [PurchaseRequestFormDetailComponent],
    imports: [
        CommonModule,
        PurchaseRequestFormDetailRoutingModule
    ]
})
export class PurchaseRequestFormDetailModule { }
