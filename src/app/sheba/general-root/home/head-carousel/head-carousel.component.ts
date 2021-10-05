import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-head-carousel',
    templateUrl: './head-carousel.component.html',
    styleUrls: ['./head-carousel.component.scss']
})
export class HeadCarouselComponent implements OnInit {

    bannerImage = environment.s3_url + 'assets/landing/banner/main-banner.jpg';

    constructor() { }

    ngOnInit() {
    }

}
