import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoWorkersDetailsComponent } from './co-workers-details.component';
import { CoWorkersDetailsBasicComponent } from './co-workers-details-basic/co-workers-details-basic.component';
import { CoWorkersDetailsOfficialComponent } from './co-workers-details-official/co-workers-details-official.component';
import { CoWorkersDetailsPersonalComponent } from './co-workers-details-personal/co-workers-details-personal.component';
import { CoWorkersDetailsFinancialComponent } from './co-workers-details-financial/co-workers-details-financial.component';
import { CoWorkersDetailsEmergencyComponent } from './co-workers-details-emergency/co-workers-details-emergency.component';
import { CoWorkersDetailsService } from '../co-workers-services/co-workers-details.service';

const routes: Routes = [
    {
        path: '',
        component: CoWorkersDetailsComponent,
        resolve: { coWorkerDetails: CoWorkersDetailsService },
        children: [
            {
                path: 'basic',
                component: CoWorkersDetailsBasicComponent
            },
            {
                path: 'official',
                component: CoWorkersDetailsOfficialComponent
            },
            {
                path: 'personal',
                component: CoWorkersDetailsPersonalComponent
            },
            {
                path: 'financial',
                component: CoWorkersDetailsFinancialComponent
            },
            {
                path: 'emergency',
                component: CoWorkersDetailsEmergencyComponent
            },
            {
                path: '**',
                redirectTo: 'basic'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CoWorkersDetailsRoutingModule { }
