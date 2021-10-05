import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleConfirmationComponent} from './simple-confirmation/simple-confirmation.component';
import {MatButtonModule, MatDialogModule} from "@angular/material";
import {ConfirmationService} from "./confirmation.service";

@NgModule({
    declarations: [SimpleConfirmationComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [SimpleConfirmationComponent],
    providers: [
        ConfirmationService
    ]
})
export class ConfirmationModule {
}
