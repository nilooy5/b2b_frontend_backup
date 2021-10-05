import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TenderLandingCoverComponent } from './tender-landing-cover/tender-landing-cover.component';
import { TenderLandingBusinessComponent } from './tender-landing-business/tender-landing-business.component';
import { LatestTendersComponent } from './latest-tenders/latest-tenders.component';
import { LandingHowWorksComponent } from './landing-how-works/landing-how-works.component';
import { WhatPeopleSayComponent } from './what-people-say/what-people-say.component';
import { TopCatagoriesComponent } from './top-catagories/top-catagories.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BottomSliderTendersComponent } from './bottom-slider-tenders/bottom-slider-tenders.component';

@NgModule({
    declarations: [
    TenderLandingCoverComponent,
    TenderLandingBusinessComponent,
    LatestTendersComponent,
    LandingHowWorksComponent,
    WhatPeopleSayComponent,
    TopCatagoriesComponent,
    BottomSliderTendersComponent,
],
    imports: [
        CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        SlickCarouselModule
    ],
    exports: [
        TenderLandingCoverComponent,
        TenderLandingBusinessComponent,
        LatestTendersComponent,
        LandingHowWorksComponent,
        WhatPeopleSayComponent,
        TopCatagoriesComponent,
        BottomSliderTendersComponent,
    ]
})

export class TenderLandingModule { }
