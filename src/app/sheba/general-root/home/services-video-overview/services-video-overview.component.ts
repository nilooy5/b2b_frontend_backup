import { Component, OnInit } from '@angular/core';
import Lity from 'lity';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-services-video-overview',
    templateUrl: './services-video-overview.component.html',
    styleUrls: ['./services-video-overview.component.scss']
})
export class ServicesVideoOverviewComponent implements OnInit {

    rectangleImage = environment.s3_url + 'assets/landing/miscellaneous/rectangle.png';

    constructor() { }

    ngOnInit() {
    }


    playVideo(type: string) {
        if (type === 'facility') {
            Lity('https://youtu.be/sPnE6VMALqU&autoplay=0');
        }

        if (type === 'fleet') {
            Lity('https://youtu.be/IbXgrnDin9E&autoplay=0');
        }

        if (type === 'rfq') {
            Lity('https://youtu.be/0YFeM_quVn4&autoplay=0');
        }

        if (type === 'topup') {
            Lity('https://youtu.be/9XG3H9OTidQ&autoplay=0');
        }
    }

}
