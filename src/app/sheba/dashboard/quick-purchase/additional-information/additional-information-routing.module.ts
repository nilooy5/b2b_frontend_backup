import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AdditionalInformationComponent } from './additional-information.component';

const routes: Routes = [
    {
        path: '',
        component: AdditionalInformationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdditionalInformationRoutingModule { }
