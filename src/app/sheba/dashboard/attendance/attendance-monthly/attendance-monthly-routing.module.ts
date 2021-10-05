import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceMonthlyComponent } from './attendance-monthly.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: AttendanceMonthlyComponent,
        children: [
            {
                path: '',
                loadChildren: './attendance-monthly-list/attendance-monthly-list.module#AttendanceMonthlyListModule',
            }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AttendanceMonthlyRoutingModule { }
