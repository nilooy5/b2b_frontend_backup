import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './comments/comments.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorStateMatcher, MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {CustomErrorStateMatcher} from "../extras/custom-error-state-matcher";

@NgModule({
    declarations: [CommentsComponent],
    imports: [
        CommonModule,
        LazyLoadImageModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [CommentsComponent],
    providers:[
        {
            provide: ErrorStateMatcher,
            useClass: CustomErrorStateMatcher
        },
    ]
})
export class CommentsModule {
}
