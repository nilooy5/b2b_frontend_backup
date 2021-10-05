import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalCreateComponent } from './approval-create.component';
import {ApprovalDetailsResolverService} from '../approval-services/approval-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ApprovalCreateComponent,
        resolve: {
            approvalDetailsResolver: ApprovalDetailsResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApprovalCreateRoutingModule { }
