import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicInfo, PersonalInfo } from '../../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-details-basic',
    templateUrl: './co-workers-details-basic.component.html',
    styleUrls: ['./co-workers-details-basic.component.scss']
})
export class CoWorkersDetailsBasicComponent {

    basicInfo: { label: string; info: string|number }[] = [];


    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.parent.data.subscribe(({ coWorkerDetails }) => {
            this.pushBasicInfoIntoArray(coWorkerDetails.basic_info, coWorkerDetails.personal_info);
        });
    }

    pushBasicInfoIntoArray(basicInfo: BasicInfo, personalInfo: PersonalInfo) {
        this.basicInfo.push(
            {
                label: 'Name',
                info: basicInfo.profile.name ? basicInfo.profile.name : 'N/A'
            },
            {
                label: 'Email',
                info: basicInfo.profile.email ? basicInfo.profile.email : 'N/A'
            },
            {
                label: 'Designation',
                info: basicInfo.designation ? basicInfo.designation : 'N/A'
            },
            {
                label: 'Department',
                info: basicInfo.department ? basicInfo.department : 'N/A'
            },
            {
                label: 'Phone',
                info: personalInfo.mobile ? personalInfo.mobile : 'N/A'
            },
            {
                label: 'Manager',
                info: basicInfo.manager_detail ? basicInfo.manager_detail.name : 'N/A'
            }
        );
    }

}
