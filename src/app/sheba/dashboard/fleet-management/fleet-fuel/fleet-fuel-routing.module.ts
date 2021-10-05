import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetFuelComponent} from './fleet-fuel.component';
import {FleetFuelHistoryService} from './fleet-fuel-history.service';
import {FleetFuelAddService} from './fleet-fuel-add.service';
import {FleetFuelDetailsService} from './fleet-fuel-details.service';
import {VehicleListService} from '../vehicle/vehicle-list.service';

const routes: Routes = [
    {
        path: '',
        component: FleetFuelComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-fuel-history/fleet-fuel-history.module#FleetFuelHistoryModule',
                resolve: {
                    history: FleetFuelHistoryService
                },
                data: {
                    name: 'Fuel History'
                }
            },
            {
                path: 'add',
                loadChildren: './fleet-fuel-add/fleet-fuel-add.module#FleetFuelAddModule',
                resolve: {
                    vehicles: VehicleListService
                },
                data: {
                    name: 'Fuel Entry'
                }
            },
            {
                path: ':fuel_id',
                loadChildren: './fleet-fuel-details/fleet-fuel-details.module#FleetFuelDetailsModule',
                resolve: {
                    fuel: FleetFuelDetailsService
                },
                data: {
                    name: 'Fuel Details'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetFuelRoutingModule { }
