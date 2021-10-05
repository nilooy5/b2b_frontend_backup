import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompanyProfileRoutingModule} from './company-profile-routing.module';
import {CompanyProfileComponent} from './company-profile.component';
import {CompanyModule} from "../../company/company.module";

@NgModule({
    declarations: [CompanyProfileComponent],
    imports: [
        CommonModule,
        CompanyProfileRoutingModule,
        CompanyModule
    ]
})
export class CompanyProfileModule {
}
