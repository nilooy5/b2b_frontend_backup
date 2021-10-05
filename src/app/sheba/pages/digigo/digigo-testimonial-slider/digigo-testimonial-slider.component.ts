import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-digigo-testimonial-slider',
  templateUrl: './digigo-testimonial-slider.component.html',
  styleUrls: ['./digigo-testimonial-slider.component.scss']
})
export class DigigoTestimonialSliderComponent implements OnInit {

    @Input() page: any;

    slides = [
        {
            image: '../../../../../assets/img/digigo-landing/testimonial/a_flat_earther.jpeg',
            heading: 'What Our Users Say',
            comment: 'DigiGO is an excellent tool that you need to manage your HR operations better. Attendance, Leave, HR announcements, Employee directory, and support tickets these are the awesome features of this app. I highly recommend digiGO for your company and to me its 100% value for money.',
            name: 'Aflatun Kaisar',
            designation: 'Chief People Officer | Sheba Platform Limited'
        }
        /*{
            image: 'https://cdn-business.s3.ap-south-1.amazonaws.com/live/landing_page/customer_images/person.png',
            heading: 'What Our Users Say',
            comment: 'We’ve taken cleaning service for our office from Sheba.xyz Business. They know what to do and how to do it. They always maintain the timing, without hampering their service quality. Very professional indeed.',
            name: 'Mr. Saiful Islam',
            designation: 'Software Engineer | Sheba limited'
        },
        {
            image: 'https://cdn-business.s3.ap-south-1.amazonaws.com/live/landing_page/customer_images/person.png',
            heading: 'What Our Users Say',
            comment: 'We’ve taken cleaning service for our office from Sheba.xyz Business. They know what to do and how to do it. They always maintain the timing, without hampering their service quality. Very professional indeed.',
            name: 'Mr. Saiful Islam',
            designation: 'Manager, Administration | Pathao limited'
        }*/
    ];

    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    dots: true,
                    arrows: true
                }
            },
            {
                breakpoint: 479,
                settings: {
                    dots: true,
                    arrows: true
                }
            },
        ]

    };

    constructor() {
    }

    ngOnInit() {
    }

}
