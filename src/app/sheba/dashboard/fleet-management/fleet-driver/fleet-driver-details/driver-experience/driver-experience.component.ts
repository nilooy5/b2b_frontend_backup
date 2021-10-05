import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-driver-experience',
    templateUrl: './driver-experience.component.html',
    styleUrls: ['./driver-experience.component.scss']
})
export class DriverExperienceComponent implements OnInit {
    experienceInformation: FormGroup;
    experienceInformationEnable: false;
    experienceInformationData: any;
    driverId: number;
    savingChanges: false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });

        this.driverId = this.route.snapshot.parent.parent.params.driver_id;
    }

    ngOnInit() {
        this.experienceInformation = this.fb.group({
            yearsOfExperience: [this.experienceInformationData.years_of_experience, Validators.required],
            trafficAwareness: [this.experienceInformationData.traffic_awareness, Validators.required],
            accidentHistory: [this.experienceInformationData.accident_history, Validators.required],
            knowledgeOfBasic: [this.experienceInformationData.basic_knowledge, Validators.required],
            ageOfLicense: [this.experienceInformationData.license_age_in_years, Validators.required],
            additionalInfo: [this.experienceInformationData.additional_info, Validators.required],
        });
    }

    setData(data: any) {
        this.experienceInformationData = data.experienceInfo;
    }

    submitContactInfo() {
        const data = this.experienceInformation.getRawValue();
        const submitData = {
            years_of_experience: data.yearsOfExperience,
            traffic_awareness: data.trafficAwareness,
            accident_history: data.accidentHistory,
            basic_knowledge: data.knowledgeOfBasic,
            license_age_in_years: data.ageOfLicense,
            additional_info: data.additionalInfo,
        };

        this.http.post('/v2/members/' + this.storage.user.member_id + '/drivers/' + this.driverId + '/experience-info', submitData).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                this.experienceInformationEnable = false;
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.savingChanges = false;
            this.pop.open(err.message);
        });
    }

}
