import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoWorkersComponent} from './co-workers.component';
import {CoWorkersListComponent} from './co-workers-list/co-workers-list.component';
import {CoWorkersListService} from './co-workers-services/co-workers-list.service';
import {CoWorkersDetailsComponent} from './co-workers-details/co-workers-details.component';

const routes: Routes = [
    {
        path: '',
        component: CoWorkersComponent,
        children: [
            {
                path: '',
                component: CoWorkersListComponent,
                resolve: {coworkersList: CoWorkersListService}
            },
            {
                path: 'add',
                loadChildren: './co-workers-add/co-workers-add.module#CoWorkersAddModule'
            },
            {
                path: ':coworker_id',
                loadChildren: './co-workers-details/co-workers-details.module#CoWorkersDetailsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CoWorkersRoutingModule {
}
