import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureLandingRoutingModule } from './feature-landing-routing.module';
import { FeatureLandingComponent } from './feature-landing.component';
import {FeatureLandingHeroComponent} from './feature-landing-hero/feature-landing-hero.component';
import { FeatureLandingChooseComponent } from './feature-landing-choose/feature-landing-choose.component';
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatStepperModule} from '@angular/material';
import { FeatureLandingGetstartedComponent } from './feature-landing-getstarted/feature-landing-getstarted.component';
import { FeatureLandingAdditionalServicesComponent } from './feature-landing-additional-services/feature-landing-additional-services.component';
import { FeatureLandingSliderComponent } from './feature-landing-slider/feature-landing-slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatureTestimonialSliderComponent } from './feature-testimonial-slider/feature-testimonial-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FeatureLandingHowItWorksComponent } from './feature-landing-how-it-works/feature-landing-how-it-works.component';
import {HomeModule} from '../home/home.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeShowcaseModule} from '../home/home-showcase/home-showcase.module';
import {DateRangePickerModule} from '../../../modules/date-range-picker/date-range-picker.module';
import { FeatureProcurementPostComponent } from './feature-procurement-post/feature-procurement-post.component';

@NgModule({
    declarations: [
        FeatureLandingComponent,
        FeatureLandingHeroComponent,
        FeatureLandingChooseComponent,
        FeatureLandingGetstartedComponent,
        FeatureLandingAdditionalServicesComponent,
        FeatureLandingSliderComponent,
        FeatureTestimonialSliderComponent,
        FeatureLandingHowItWorksComponent,
        FeatureProcurementPostComponent
    ],
    exports: [
        FeatureTestimonialSliderComponent
    ],
    imports: [
        CommonModule,
        FeatureLandingRoutingModule,
        NgbModule,
        SlickCarouselModule,
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
    ]
})
export class FeatureLandingModule { }
