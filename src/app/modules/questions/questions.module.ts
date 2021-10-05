import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionsComponent} from './questions.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        QuestionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        DragDropModule
    ],
    exports: [
        QuestionsComponent
    ]
})
export class QuestionsModule { }
