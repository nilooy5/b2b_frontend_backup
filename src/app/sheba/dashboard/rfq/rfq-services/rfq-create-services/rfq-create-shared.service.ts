import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ValidFormControls } from '../../../../../types/rfq';

@Injectable({
  providedIn: 'root'
})
export class RfqCreateSharedService {

    private generalInfoValidationSource = new Subject<ValidFormControls>();
    currentGeneralInfoValidationStatus = this.generalInfoValidationSource.asObservable();

    private journeyValidationSource = new Subject<string>();
    currentJourneyValidationStatus = this.journeyValidationSource.asObservable();

    private journeySubmitSource = new Subject<any>();
    currentJourneySubmitStatus = this.journeySubmitSource.asObservable();

    constructor() { }

    changeBasicInfoValidationStatus(validFormControlObject: ValidFormControls) {
        this.generalInfoValidationSource.next(validFormControlObject);
    }

    changeJourneyValidationStatus(state: string) {
        this.journeyValidationSource.next(state);
    }

    changeJourneySubmitStatus(route: string, type?: string) {
        this.journeySubmitSource.next({ route, type });
    }
}
