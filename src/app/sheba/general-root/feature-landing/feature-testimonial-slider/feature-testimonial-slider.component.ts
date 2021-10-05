import {Component, Input, OnInit} from '@angular/core';

declare function require(name: string): any;

@Component({
    selector: 'app-feature-testimonial-slider',
    templateUrl: './feature-testimonial-slider.component.html',
    styleUrls: ['./feature-testimonial-slider.component.scss']
})
export class FeatureTestimonialSliderComponent implements OnInit {

    @Input() page: any;

    slides = [
        {
            image: '../../../../../assets/img/landing/testimonial/jishan.png',
            heading: 'What Our Users Say',
            comment: 'I feel now i have complete control over the task with no need to offline payment. This is great during this current situation. sBusiness.xyz saves my time',
            name: 'Jishan Rahaman',
            designation: 'Admin Manager | Solshare limited'
        }
    ];

    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 479,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
        ]

    };

    constructor() {
    }

    ngOnInit() {
    }
}
