import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentsComponent} from './departments.component';
import {DepartmentListService} from './department-list.service';

const routes: Routes = [
    {
        path: '',
        component: DepartmentsComponent,
        children: [
            {
                path: '',
                loadChildren: './department-list/department-list.module#DepartmentListModule',
                resolve: {
                    departments: DepartmentListService
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
