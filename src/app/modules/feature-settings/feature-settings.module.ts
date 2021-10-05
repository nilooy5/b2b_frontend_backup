import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSettingsComponent } from './feature-settings.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [FeatureSettingsComponent],
    exports: [
        FeatureSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class FeatureSettingsModule { }
