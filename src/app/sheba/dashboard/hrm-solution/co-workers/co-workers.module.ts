import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoWorkersComponent } from './co-workers.component';
import { CoWorkersRoutingModule } from './co-workers-routing.module';
import { CoWorkersListModule } from './co-workers-list/co-workers-list.module';
import { CoWorkersDetailsModule } from './co-workers-details/co-workers-details.module';

@NgModule({
    declarations: [
        CoWorkersComponent,
    ],
    imports: [
        CommonModule,
        CoWorkersRoutingModule,
        CoWorkersListModule,
        CoWorkersDetailsModule
    ],

})

export class CoWorkersModule { }
