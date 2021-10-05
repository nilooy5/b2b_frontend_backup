import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenderComponent } from './tender.component';
import {TenderLandingComponent} from './tender-landing/tender-landing.component';
import {TenderLandingService} from './tender-services/tender-landing/tender-landing.service';
// import { TenderHomeComponent } from './tender-home/tender-home.component';
// import {TenderListComponent} from './tender-list/tender-list.component';
// import {TenderListService} from './tender-services/tender-list.service';


const routes: Routes = [
    {
        path: '',
        component: TenderComponent,
        children: [
            {
                path: '',
                component: TenderLandingComponent,
                resolve: { tenderLandingInfo: TenderLandingService }
            },
            {
                path: 'list',
                loadChildren: './tender-general/tender-general.module#TenderGeneralModule'
            },
            {
                path: ':id',
                children: [
                    {
                        path: 'participate',
                        loadChildren: './tender-general/tender-participate/tender-participate.module#TenderParticipateModule'
                    },
                    {
                        path: 'hire/:bid_id',
                        loadChildren: './tender-general/tender-hire/tender-hire.module#TenderHireModule'
                    }
                ]
            },
            // {
            //     path: ':tender_id/hire/:bid_id',
            //     loadChildren: './tender-general/tender-participate/tender-participate.module#TenderParticipateModule'
            // },
            // {
            //     path: 'list',
            //     component: TenderListComponent,
            //     resolve: { tenderList: TenderListService },
            //     children: [
            //         {
            //             path: ':id',
            //             loadChildren: './tender-list/tender-list-details/tender-list-details.module#TenderListDetailsModule'
            //         },
            //     ]
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TenderRoutingModule { }
