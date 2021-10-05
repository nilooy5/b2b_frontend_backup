import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportDetailsComponent } from './support-details.component';
import {SupportDetailsService} from './support-details.service';

const routes: Routes = [
    {
        path: '',
        component: SupportDetailsComponent,
        resolve: {
            supportDetails: SupportDetailsService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SupportDetailsRoutingModule { }
