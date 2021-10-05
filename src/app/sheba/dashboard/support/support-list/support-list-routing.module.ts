import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportListComponent } from './support-list.component';
import {SupportListService} from './support-list.service';

const routes: Routes = [
    {
        path: '',
        component: SupportListComponent,
        resolve: {
            supportList: SupportListService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SupportListRoutingModule { }
