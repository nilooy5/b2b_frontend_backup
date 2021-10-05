import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalListComponent } from './approval-list.component';
import {ApprovalListResolverService} from '../approval-services/approval-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ApprovalListComponent,
        resolve: {
            approvalListResolver: ApprovalListResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApprovalListRoutingModule { }
