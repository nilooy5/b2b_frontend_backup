import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenderListComponent } from './tender-list/tender-list.component';
import { TenderDetailsComponent } from './tender-details/tender-details.component';
import {TenderGeneralComponent} from './tender-general.component';
import {TenderListService} from '../tender-services/tender-list.service';
import {TenderDescriptionService} from '../tender-services/tender-description.service';

const routes: Routes = [
    {
        path: '',
        component: TenderGeneralComponent,
        children: [
            {
                path: '',
                component: TenderListComponent,
                resolve: { tenderList: TenderListService },
            },
            {
                path: ':id',
                component: TenderDetailsComponent,
                resolve: { tenderDetails: TenderDescriptionService }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TenderGeneralRoutingModule { }
