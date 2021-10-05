import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfqComponent } from './rfq.component';
import {RfqListComponent} from './rfq-list/rfq-list.component';
import {RfqListService} from './rfq-services/rfq-list-service/rfq-list.service';

const routes: Routes = [
    {
        path: '',
        component: RfqComponent,
        children: [
            {
                path: 'list',
                component: RfqListComponent,
                resolve: {
                    procurementTenderLists: RfqListService,
                }
            },
            {
                path: 'create',
                loadChildren: './rfq-create/rfq-create.module#RfqCreateModule'
            },
            {
                path: 'list/:id',
                loadChildren: './rfq-details-general/rfq-details-general.module#RfqDetailsGeneralModule',
            },
            {
                path: 'orders',
                loadChildren: './rfq-orders/rfq-orders.module#RfqOrdersModule'
            },
            {
                path: '**',
                redirectTo: 'create'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RfqRoutingModule { }
