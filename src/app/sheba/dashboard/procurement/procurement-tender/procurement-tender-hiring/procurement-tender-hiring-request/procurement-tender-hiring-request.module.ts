import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderHiringRequestComponent} from './procurement-tender-hiring-request.component';
import {ProcurementTenderHiringRequestRoutingModule} from './procurement-tender-hiring-request-routing.module';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularEditorModule} from '@kolkov/angular-editor';


@NgModule({
    declarations: [
        ProcurementTenderHiringRequestComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderHiringRequestRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgxEditorModule,
        HttpClientModule,
        AngularEditorModule,
        FormsModule
    ],
    exports: [
        ProcurementTenderHiringRequestComponent
    ]
})
export class ProcurementTenderHiringRequestModule { }
