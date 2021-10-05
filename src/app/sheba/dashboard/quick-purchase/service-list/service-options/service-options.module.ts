import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {ServiceOptionsComponent} from './service-options.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ServiceOptionsComponent],
    imports: [
        CommonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule
    ],
    entryComponents: [ServiceOptionsComponent],
    exports: [ServiceOptionsComponent],
})
export class ServiceOptionsModule {
}
