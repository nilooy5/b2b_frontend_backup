import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})

export class RfqHomeService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    checkUserProfile(userEmail) {
        return this.http.post('v2/profile-check', userEmail);
    }

    postRegistrationInfo(registrationInfo) {
        return this.http.post('v2/business/register', registrationInfo);
    }

    postBusinessInfo(data) {
        return this.http.post('v2/members/' + this.storage.user.member_id + '/update-business-info', data);
    }

    postRFQ(businessId, data) {
        return this.http.post('v2/businesses/' + businessId + '/procurements', data);
    }
}
