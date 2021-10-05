import { Injectable } from '@angular/core';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProcurementPublishServiceService {

  constructor(
      private storage: StorageService,
      private http: ShebaHttpService
  ) { }

  publishProcurement(submitData) {
      return new Promise((resolve, reject) => {
          this.http.post('/v2/businesses/' + this.storage.user.business_id + '/procurements', submitData).toPromise().then(res => {
              if (res.code === 200) {
                  resolve(res);
              } else {
                  reject(res);
              }
          }).catch(err => {
              reject(err);
          });
      });
  }


}
