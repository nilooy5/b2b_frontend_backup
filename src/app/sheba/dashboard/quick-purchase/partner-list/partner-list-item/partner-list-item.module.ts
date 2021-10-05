import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartnerListItemComponent} from './partner-list-item.component';

@NgModule({
    declarations: [
        PartnerListItemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PartnerListItemComponent
    ]
})
export class PartnerListItemModule { }
