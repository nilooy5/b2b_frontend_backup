import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicInfo, OfficialInfo } from '../../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-details-official',
    templateUrl: './co-workers-details-official.component.html',
    styleUrls: ['./co-workers-details-official.component.scss']
})

export class CoWorkersDetailsOfficialComponent  {

    officialInfo: { label: string; info: string|number }[] = [];

    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.parent.data.subscribe(({ coWorkerDetails }) => {
            this.pushOfficialInfoIntoArray(coWorkerDetails.official_info, coWorkerDetails.basic_info);
        });
    }

    pushOfficialInfoIntoArray(officialInfo: OfficialInfo, basicInfo: BasicInfo) {
        this.officialInfo.push(
            {
                label: 'Employee ID',
                info: basicInfo.id ? basicInfo.id : 'N/A'
            },
            {
                label: 'Grade',
                info: officialInfo.grade ? officialInfo.grade : 'N/A'
            },
            {
                label: 'Join of Date',
                info: officialInfo.join_date ? officialInfo.join_date : 'N/A'
            },
            {
                label: 'Employee Type',
                info: officialInfo.employee_type ? officialInfo.employee_type : 'N/A'
            },
            {
                label: 'Manager',
                info: basicInfo.manager_detail ? basicInfo.manager_detail.name : 'N/A'
            },
            {
                label: 'Previous Institution',
                info: officialInfo.previous_institution ? officialInfo.previous_institution : 'N/A'
            }
        );
    }

}
