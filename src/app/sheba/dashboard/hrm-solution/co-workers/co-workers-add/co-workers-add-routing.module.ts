import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoWorkersAddComponent} from './co-workers-add.component';
import {CoWorkersAddBasicComponent} from './co-workers-add-basic/co-workers-add-basic.component';
import {CoWorkersAddOfficialComponent} from './co-workers-add-official/co-workers-add-official.component';
import {CoWorkersAddPersonalComponent} from './co-workers-add-personal/co-workers-add-personal.component';
import {CoWorkersAddFinancialComponent} from './co-workers-add-financial/co-workers-add-financial.component';
import {CoWorkersAddEmergencyComponent} from './co-workers-add-emergency/co-workers-add-emergency.component';
import {BanksListService} from '../co-workers-services/banks-list.service';
import {CoWorkersAddGuard} from '../co-workers-guard/co-workers-add.guard';
import {CoWorkersBasicService} from '../co-workers-services/co-workers-basic.service';
import {CoWorkersAddService} from '../co-workers-services/co-workers-add.service';

const routes: Routes = [
    {
        path: '',
        component: CoWorkersAddComponent,
        resolve: {coworkersAdd: CoWorkersAddService},
        runGuardsAndResolvers: 'always',
        children: [
            {
                path: 'basic',
                component: CoWorkersAddBasicComponent,
                resolve: {coworkersBasic: CoWorkersBasicService}
            },
            {
                path: 'official',
                component: CoWorkersAddOfficialComponent,
                canActivate: [CoWorkersAddGuard]
            },
            {
                path: 'personal',
                component: CoWorkersAddPersonalComponent,
                canActivate: [CoWorkersAddGuard]
            },
            {
                path: 'financial',
                component: CoWorkersAddFinancialComponent,
                canActivate: [CoWorkersAddGuard],
                resolve: {banksList: BanksListService}
            },
            {
                path: 'emergency',
                component: CoWorkersAddEmergencyComponent,
                canActivate: [CoWorkersAddGuard]
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

export class CoWorkersAddRoutingModule {
}
