import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestComponent} from "./purchase-request.component";
import {PurchaseRequestFormsService} from "./purchase-request-forms.service";
import {PurchaseRequestFormDetailService} from "./purchase-request-form-detail.service";
import {PurchaseRequestListService} from './purchase-request-list.service';
import {PurchaseRequestDetailService} from './purchase-request-detail.service';
import {PurchaseRequestMemberListService} from './purchase-request-member-list.service';

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestComponent,
        children: [
            {
                path: 'forms',
                loadChildren: './purchase-request-forms/purchase-request-forms.module#PurchaseRequestFormsModule',
                resolve: {
                    forms: PurchaseRequestFormsService
                }
            },
            {
                path: 'form-create',
                loadChildren: './purchase-request-form-create/purchase-request-form-create.module#PurchaseRequestFormCreateModule',
            },
            {
                path: 'form-edit',
                loadChildren: './purchase-request-form-edit/purchase-request-form-edit.module#PurchaseRequestFormEditModule',
                resolve: {
                    detail: PurchaseRequestFormDetailService
                }
            },
            {
                path: 'create',
                loadChildren: './purchase-request-create/purchase-request-create.module#PurchaseRequestCreateModule',
                resolve: {
                    forms: PurchaseRequestFormsService
                }
            },
            {
                path: 'list',
                loadChildren: './purchase-request-list/purchase-request-list.module#PurchaseRequestListModule',
                resolve: {
                    purchaseRequests: PurchaseRequestListService
                }
            },
            {
                path: 'detail',
                loadChildren: './purchase-request-detail/purchase-request-detail.module#PurchaseRequestDetailModule',
                resolve: {
                    detail: PurchaseRequestDetailService,
                    members: PurchaseRequestMemberListService
                }
            },
            {
                path: 'form-detail',
                loadChildren: './purchase-request-form-detail/purchase-request-form-detail.module#PurchaseRequestFormDetailModule',
                resolve: {
                    detail: PurchaseRequestFormDetailService
                }
            },

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestRoutingModule { }
