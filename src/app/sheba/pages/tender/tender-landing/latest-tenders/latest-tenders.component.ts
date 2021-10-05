import { Component, Input } from '@angular/core';
import { TenderDetails } from '../../../../../types/tender';

@Component({
    selector: 'app-latest-tenders',
    templateUrl: './latest-tenders.component.html',
    styleUrls: ['./latest-tenders.component.scss'],
})

export class LatestTendersComponent  {

    tenders: TenderDetails[];
    isMobileDevice: any;

    slideConfig  = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.05,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            }
        ]
    };

    @Input()
    set tendersData(data: TenderDetails[]) {
        this.tenders = data;
    }
    get tendersData() {
        return this.tenders;
    }

    constructor() { }

}
