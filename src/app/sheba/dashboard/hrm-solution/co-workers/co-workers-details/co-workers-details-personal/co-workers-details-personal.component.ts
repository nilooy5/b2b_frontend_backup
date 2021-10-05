import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInfo } from '../../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-details-personal',
    templateUrl: './co-workers-details-personal.component.html',
    styleUrls: ['./co-workers-details-personal.component.scss']
})

export class CoWorkersDetailsPersonalComponent {

    personalInfo: { label: string; info: string|number; downloadable: boolean }[] = [];
    nidFrontImage: string;
    nidBackImage: string;

    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.parent.data.subscribe(({ coWorkerDetails }) => {
            this.nidFrontImage = coWorkerDetails.personal_info.nid_image_front;
            this.nidBackImage = coWorkerDetails.personal_info.nid_image_back;
            this.pushBasicInfoIntoArray(coWorkerDetails.personal_info);
        });
    }

    pushBasicInfoIntoArray(personalInfo: PersonalInfo) {
        this.personalInfo.push(
            {
                label: 'Phone',
                info: personalInfo.mobile ? personalInfo.mobile : 'N/A',
                downloadable: false
            },
            {
                label: 'Date of Birth',
                info: personalInfo.date_of_birth ? personalInfo.date_of_birth : 'N/A',
                downloadable: false
            },
            {
                label: 'Address',
                info: personalInfo.address ? personalInfo.address : 'N/A',
                downloadable: false
            },
            {
                label: 'Nationality',
                info: personalInfo.nationality ? personalInfo.nationality : 'N/A',
                downloadable: false
            },
            {
                label: 'NID / Passport',
                info: personalInfo.nid_no ? personalInfo.nid_no : 'N/A',
                downloadable: !!(personalInfo.nid_image_front || personalInfo.nid_image_back)
            }
        );
    }


}
