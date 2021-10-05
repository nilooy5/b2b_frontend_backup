import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import {MatTooltipModule} from '@angular/material';
import { NotificationsContentComponent } from './notifications-content/notifications-content.component';

@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationsContentComponent
    ],
    imports: [
        CommonModule,
        NotificationsRoutingModule,
        MatTooltipModule
    ],
    exports: [
        NotificationsComponent,
        NotificationsContentComponent
    ]
})


export class NotificationsModule { }
