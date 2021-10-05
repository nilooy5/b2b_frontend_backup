import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {Vendor} from '../../../../types/vendors';
import {ConfirmationModalComponent} from '../../../modals/confirmation-modal/confirmation-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ProcurementVendorInviteService {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    submitVendors(procurementId, vendors: any[]) {
        return new Promise((resolve, reject) => {
            this.http.post('/v2/businesses/' + this.storage.user.business_id + '/procurements/' + procurementId + '/invitations', {
                partners: JSON.stringify(vendors)
            }).toPromise().then(res => {
                res.code ? resolve(res) : reject(res.message);
            }).catch(err => {
                reject('Something went wrong.');
            });
        });
    }
}
