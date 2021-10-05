import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuickPurchaseComponent} from './quick-purchase.component';
import {SubCategoryService} from "./sub-category.service"   ;
import {ServiceListService} from './service-list.service';
import {PartnerListService} from './partner-list.service';
import {ScheduleService} from './schedule.service';
import {PaymentService} from './payment.service';

const routes: Routes = [
    {
        path: '',
        component: QuickPurchaseComponent,
        children: [
            {
                path: '',
                loadChildren: './master-category/master-category.module#MasterCategoryModule',
                resolve: {
                    categories: SubCategoryService
                }
            },
            // {
            //     path: '',
            //     loadChildren: './subcategory-list/subcategory-list.module#SubcategoryListModule',
            //     resolve: {
            //         categories: SubCategoryService
            //     }
            // },
            {
                path: 'select-service',
                loadChildren: './service-list/service-list.module#ServiceListModule',
                resolve: {
                    services: ServiceListService
                }
            },
            {
                path: 'option',
                loadChildren: './option/option.module#OptionModule'
            },
            {
                path: 'cart',
                loadChildren: './quick-purchase-cart/quick-purchase-cart.module#QuickPurchaseCartModule',
                resolve: {
                    partners: PartnerListService
                }
            },
            {
                path: 'select-partner',
                loadChildren: './partner-list/partner-list.module#PartnerListModule',
                resolve: {
                    partners: PartnerListService
                }
            },
            {
                path: 'additional-information',
                loadChildren: './additional-information/additional-information.module#AdditionalInformationModule'
            },
            {
                path: 'schedule',
                loadChildren: './schedule/schedule.module#ScheduleModule',
                resolve: {
                    dates: ScheduleService
                }
            },
            {
                path: 'checkout',
                loadChildren: './checkout/checkout.module#CheckoutModule'
            },
            {
                path: 'payment',
                loadChildren: './payment/payment.module#PaymentModule',
                resolve: {
                    payments: PaymentService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuickPurchaseRoutingModule {
}
