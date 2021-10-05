import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailCheckService {

  constructor(
      private http: ShebaHttpService
  ) { }

    checkIfEmailExists(email) {
      return new Promise((resolve, reject) => {
          this.http.getFromAccountsApi('api/v3/profile?email=' + email)
              .toPromise()
              .then(res => {
                  resolve(res ? res.is_registered : 0);
              }).catch(error => {
                  reject(error);
              });
      });
    }
}
