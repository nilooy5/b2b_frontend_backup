import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';
import { BadgeColorPipe } from './badge-color.pipe';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ BadgeComponent, BadgeColorPipe ],
    exports: [ BadgeComponent ]
})

export class BadgeModule { }
