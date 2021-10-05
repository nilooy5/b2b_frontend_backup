import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support.component';

const routes: Routes = [
    {
        path: '',
        component: SupportComponent,
        children: [
            {
                path: '',
                loadChildren: './support-list/support-list.module#SupportListModule'
            },
            {
                path: ':support_id',
                loadChildren: './support-details/support-details.module#SupportDetailsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SupportRoutingModule { }
