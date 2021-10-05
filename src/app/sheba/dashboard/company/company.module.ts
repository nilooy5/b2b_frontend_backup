import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyUpdateComponent} from './company-update/company-update.component';
import {CompanyService} from "./company.service";
import {MatDialogModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { CompanyUpdateFlatComponent } from './company-update-flat/company-update-flat.component';

@NgModule({
    declarations: [CompanyUpdateComponent, CompanyUpdateFlatComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
    entryComponents: [CompanyUpdateComponent],
    exports: [CompanyUpdateComponent, CompanyUpdateFlatComponent],
    providers: [CompanyService]
})
export class CompanyModule {
}
