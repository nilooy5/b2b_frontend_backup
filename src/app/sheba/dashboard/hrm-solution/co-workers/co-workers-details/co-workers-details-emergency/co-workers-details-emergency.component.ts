import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmergencyInfo } from '../../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-details-emergency',
    templateUrl: './co-workers-details-emergency.component.html',
    styleUrls: ['./co-workers-details-emergency.component.scss']
})

export class CoWorkersDetailsEmergencyComponent {

    emergencyInfo: { label: string; info: string }[] = [];

    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.parent.data.subscribe(({ coWorkerDetails }) => {
            this.pushEmergencyInfoIntoArray(coWorkerDetails.emergency_info);
        });
    }

    pushEmergencyInfoIntoArray(emergencyInfo: EmergencyInfo) {
        this.emergencyInfo.push(
            {
                label: 'Name',
                info: emergencyInfo.emergency_contract_person_name ? emergencyInfo.emergency_contract_person_name : 'N/A'
            },
            {
                label: 'Mobile Number',
                info: emergencyInfo.emergency_contract_person_number ? emergencyInfo.emergency_contract_person_number : 'N/A'
            },
            {
                label: 'Relationship',
                info: emergencyInfo.emergency_contract_person_relationship ? emergencyInfo.emergency_contract_person_relationship : 'N/A'
            }
        );
    }

}
