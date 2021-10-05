import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import {ComingSoonComponent} from './coming-soon.component';

@NgModule({
    declarations: [
        ComingSoonComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [
        ComingSoonComponent
    ],
    entryComponents: [
        ComingSoonComponent
    ]
})
export class ComingSoonModule { }
