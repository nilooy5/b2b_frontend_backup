import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DigigoComponent} from './digigo.component';
import {DigigoRouting} from './digigo.routing';
import { DigigoHeroSectionComponent } from './digigo-hero-section/digigo-hero-section.component';
import {MatButtonModule} from "@angular/material/button";
import { DigigoWhyChooseUsComponent } from './digigo-why-choose-us/digigo-why-choose-us.component';
import { DigigoSubscribeNewsletterComponent } from './digigo-subscribe-newsletter/digigo-subscribe-newsletter.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DigigoWhatWeOfferComponent } from './digigo-what-we-offer/digigo-what-we-offer.component';
import { DigigoMainFeaturesComponent } from './digigo-main-features/digigo-main-features.component';
import { DigigoGetAppNowComponent } from './digigo-get-app-now/digigo-get-app-now.component';
import { DigigoTestimonialSliderComponent } from './digigo-testimonial-slider/digigo-testimonial-slider.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import {ContactUsModule} from '../../general-root/contact-us/contact-us.module';
import { DigigoHowItWorksComponent } from './digigo-how-it-works/digigo-how-it-works.component';

@NgModule({
    declarations: [
        DigigoComponent,
        DigigoHeroSectionComponent,
        DigigoWhyChooseUsComponent,
        DigigoSubscribeNewsletterComponent,
        DigigoWhatWeOfferComponent,
        DigigoMainFeaturesComponent,
        DigigoGetAppNowComponent,
        DigigoTestimonialSliderComponent,
        DigigoHowItWorksComponent
    ],
    imports: [
        CommonModule,
        DigigoRouting,
        MatButtonModule,
        ReactiveFormsModule,
        SlickCarouselModule,
        ContactUsModule
    ]
})
export class DigigoModule {
}
