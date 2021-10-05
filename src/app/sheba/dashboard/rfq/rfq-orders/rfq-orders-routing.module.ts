import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RfqOrdersListComponent} from './rfq-orders-list/rfq-orders-list.component';
import {RfqOrdersComponent} from './rfq-orders.component';
import {RfqOrdersDetailsGeneralComponent} from './rfq-orders-details-general/rfq-orders-details-general.component';
import {RfqOrdersDetailsComponent} from './rfq-orders-details-general/rfq-orders-details/rfq-orders-details.component';
import {RfqOrdersBillComponent} from './rfq-orders-details-general/rfq-orders-bill/rfq-orders-bill.component';
import {RfqOrdersWorkorderComponent} from './rfq-orders-details-general/rfq-orders-workorder/rfq-orders-workorder.component';
import {RfqOrdersTimelineComponent} from './rfq-orders-details-general/rfq-orders-timeline/rfq-orders-timeline.component';
import {RfqOrderBillService} from '../rfq-services/rfq-order-services/rfq-order-bill.service';
import {RfqOrderWorkorderService} from '../rfq-services/rfq-order-services/rfq-order-workorder.service';
import {RfqOrderTimelineService} from '../rfq-services/rfq-order-services/rfq-order-timeline.service';
import {RfqOrderDetailsService} from '../rfq-services/rfq-order-services/rfq-order-details.service';
import {RfqOrdersListService} from '../rfq-services/rfq-order-services/rfq-orders-list.service';
import {RfqOrderBillPaymentsService} from '../rfq-services/rfq-order-services/rfq-order-bill-payments.service';

const routes: Routes = [
    {
        path: '',
        component: RfqOrdersComponent,
        children: [
            {
                path: '',
                component: RfqOrdersListComponent,
                resolve: {
                    rfqOrdersList: RfqOrdersListService
                }
            },
            {
                path: ':id',
                component: RfqOrdersDetailsGeneralComponent,
                resolve: {
                    rfqOrderDetails: RfqOrderDetailsService
                },
                children: [
                    {
                        path: 'details',
                        component: RfqOrdersDetailsComponent,
                        resolve: {
                            rfqOrderDetails: RfqOrderDetailsService
                        }
                    },
                    {
                        path: 'bill',
                        component: RfqOrdersBillComponent,
                        resolve: {
                            orderBill: RfqOrderBillService,
                            billPayments: RfqOrderBillPaymentsService
                        }
                    },
                    {
                        path: 'workorder',
                        component: RfqOrdersWorkorderComponent,
                        resolve: {
                            workorder: RfqOrderWorkorderService
                        }
                    },
                    {
                        path: 'timeline',
                        component: RfqOrdersTimelineComponent,
                        resolve: {
                            orderTimeline: RfqOrderTimelineService
                        }
                    },
                    {
                        path: '**',
                        redirectTo: 'details'
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RfqOrdersRoutingModule { }
