import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseRequestDetailRoutingModule} from './purchase-request-detail-routing.module';
import {PurchaseRequestDetailComponent} from './purchase-request-detail.component';
import {MatTableModule} from '@angular/material';
import { PurchaseRequestRejectNoteModule } from './purchase-request-reject-note/purchase-request-reject-note.module';
import {PurchaseRequestApprovalModule} from './purchase-request-approval/purchase-request-approval.module';

@NgModule({
    declarations: [PurchaseRequestDetailComponent],
    imports: [
        CommonModule,
        PurchaseRequestDetailRoutingModule,
        MatTableModule,
        PurchaseRequestRejectNoteModule,
        PurchaseRequestApprovalModule
    ]
})
export class PurchaseRequestDetailModule { }
