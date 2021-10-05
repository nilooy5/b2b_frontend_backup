import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [MainFooterComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule
    ],
    exports: [MainFooterComponent]
})
export class FootersModule {
}
