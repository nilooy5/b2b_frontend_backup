import { Injectable } from '@angular/core';
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../services/storage.service";
import '../../../../helpers/extends';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementsCreateService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    save(data) {
        return this.http.post('/v2/businesses/' + this.storage.user.business_id + '/announcements', data);
    }

}
