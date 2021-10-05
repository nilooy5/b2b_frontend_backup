import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralInformation } from '../../../../../types/rfq';
import { Resolve } from '@angular/router';
import { RfqCreateService } from './rfq-create.service';

@Injectable({
  providedIn: 'root'
})

export class RfqCreateGeneralResolverService implements Resolve<GeneralInformation> {

    constructor(private rfqCreateService: RfqCreateService) { }

    resolve(): Observable<GeneralInformation> | Promise <GeneralInformation> | GeneralInformation {
        return this.rfqCreateService.getAdditionalInformation().pipe(map(({ procurements: additionalInformation }) => {
            return additionalInformation;
        }));
    }
}
