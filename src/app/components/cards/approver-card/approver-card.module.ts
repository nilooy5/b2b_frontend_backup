import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApproverCardComponent} from './approver-card.component';

@NgModule({
    declarations: [
        ApproverCardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ApproverCardComponent
    ]
})
export class ApproverCardModule { }
