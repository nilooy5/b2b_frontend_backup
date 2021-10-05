import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmplitudeService} from '../../../services/amplitude.service';

@Component({
    selector: 'app-feature-landing',
    templateUrl: './feature-landing.component.html',
    styleUrls: ['./feature-landing.component.scss']
})
export class FeatureLandingComponent implements OnInit {

    public feature: string = null;
    public services: string = null;
    reference: string;


    constructor(private route: ActivatedRoute,
                private amplitude: AmplitudeService
    ) {
        route.queryParams.subscribe(res => {
            this.feature = res.feature;
        });
        this.reference = this.route.snapshot.queryParams.reference;
        this.feature = this.route.snapshot.queryParams.feature;
    }

    ngOnInit() {
        this.fireAmplitudeEvent(this.reference);
    }

    fireAmplitudeEvent(data) {
        this.amplitude.fireCustomEvent(this.reference, {});
    }

}
