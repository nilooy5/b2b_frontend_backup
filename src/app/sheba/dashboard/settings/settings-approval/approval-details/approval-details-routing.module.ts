import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalDetailsComponent } from './approval-details.component';
import {ApprovalDetailsResolverService} from '../approval-services/approval-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ApprovalDetailsComponent,
        resolve: {
            approvalDetailsResolver: ApprovalDetailsResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApprovalDetailsRoutingModule { }
