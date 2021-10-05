import { Injectable, Inject } from '@angular/core';
import {Subject} from 'rxjs';
import {TenderService} from '../../../../../services/tender-service/tender.service';

@Injectable({
    providedIn: 'root'
})
export class ProcurementFormValidationService {
    private notify = new Subject<any>();
    /**
     * Observable string streams
     */
    public notifyObservable = this.notify.asObservable();

    constructor(
        private tenderService: TenderService
    ) {
    }

    public notifySubmit(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
}
