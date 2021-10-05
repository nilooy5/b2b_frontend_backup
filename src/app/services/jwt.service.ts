import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../modules/sheba-http/sheba-http.service';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
    }

    public getJWT() {
        return new Promise((resolve, reject) => {
            this.http.getFromAccountsApi('api/v3/token/generate?type=member&type_id=' + this.storage.user.member_id + '&token=' + this.storage.user.remember_token)
                .toPromise()
                .then(response => {
                    resolve(response);
                }).catch(error => {
                reject(error);
            });
        });
    }
}
