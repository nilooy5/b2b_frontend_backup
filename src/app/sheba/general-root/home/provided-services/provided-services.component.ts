import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-provided-services',
    templateUrl: './provided-services.component.html',
    styleUrls: ['./provided-services.component.scss']
})

export class ProvidedServicesComponent  {

    servicesTypes = [
        {
            name: 'facility',
            title: 'Facility Management',
            imageSrc: '../../../../../assets/img/landing/provided-services/facility.svg'
        },
        {
            name: 'fleet',
            title: 'Fleet Management',
            imageSrc: '../../../../../assets/img/landing/provided-services/fleet.svg'
        },
        {
            name: 'rfq',
            title: 'Request Quotation',
            imageSrc: '../../../../../assets/img/landing/provided-services/quotation.svg'
        },
        {
            name: 'top-up',
            title: 'Mobile Top-up',
            imageSrc: '../../../../../assets/img/landing/provided-services/topup.svg'
        },
    ];

    constructor(private router: Router) { }


    redirectToFeatureLanding(featureType: string) {
        if (featureType === 'facility') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'facility', reference: 'Top_Menu_Facility'}}).then();
        }

        if (featureType === 'fleet') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'fleet', reference: 'Top_Menu_Fleet'}}).then();
        }

        if (featureType === 'rfq') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'procurement', reference: 'Top_Menu_RFQ'}}).then();
        }

        if (featureType === 'top-up') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'topup', reference: 'Top_Menu_Topup'}}).then();
        }
    }
}
