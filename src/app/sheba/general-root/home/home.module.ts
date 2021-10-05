import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { TrustedBySectionComponent } from './trusted-by-section/trusted-by-section.component';
import { PricePlanSectionComponent } from './price-plan-section/price-plan-section.component';
import { FeatureSectionComponent } from './feature-section/feature-section.component';
import { HomeFormSectionComponent } from './home-form-section/home-form-section.component';
import { JoinAsSpSectionComponent } from './join-as-sp-section/join-as-sp-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeShowcaseModule } from './home-showcase/home-showcase.module';
import { HeadCarouselComponent } from './head-carousel/head-carousel.component';
import { ProvidedServicesComponent } from './provided-services/provided-services.component';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatStepperModule} from '@angular/material';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { VideoWalkthrougComponent } from './video-walkthroug/video-walkthroug.component';
import { StartFreeTrialComponent } from './start-free-trial/start-free-trial.component';
import { ServicesVideoOverviewComponent } from './services-video-overview/services-video-overview.component';
import { SubscribeNewsletterComponent } from './subscribe-newsletter/subscribe-newsletter.component';
import { ServiceGalleryComponent } from './service-gallery/service-gallery.component';
import { DateRangePickerModule } from '../../../modules/date-range-picker/date-range-picker.module';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { FeatureLandingModule } from '../feature-landing/feature-landing.module';
import {ImageModalModule} from '../../modals/image-modal/image-modal.module';



@NgModule({
    declarations: [
        HomeComponent,
        HeroSectionComponent,
        TrustedBySectionComponent,
        PricePlanSectionComponent,
        FeatureSectionComponent,
        HomeFormSectionComponent,
        JoinAsSpSectionComponent,
        HeadCarouselComponent,
        ProvidedServicesComponent,
        WhyChooseUsComponent,
        VideoWalkthrougComponent,
        StartFreeTrialComponent,
        ServicesVideoOverviewComponent,
        SubscribeNewsletterComponent,
        ServiceGalleryComponent,
        CustomerFeedbackComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HomeShowcaseModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        DateRangePickerModule,
        FeatureLandingModule,
        ImageModalModule
    ],
})
export class HomeModule { }
