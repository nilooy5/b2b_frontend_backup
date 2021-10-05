import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetCalendarComponent} from './fleet-calendar.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ResizableModule} from "angular-resizable-element";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [FleetCalendarComponent],
    imports: [
        CommonModule,
        DragDropModule,
        ResizableModule,
        RouterModule
    ],
    exports: [FleetCalendarComponent]
})
export class FleetCalendarModule {
}
