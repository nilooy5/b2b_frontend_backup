import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class ProcurementTenderDetailSharedService {

    private details = new Subject<any>();

    get procurementDetails() {
        return this.details.asObservable();
    }

    addProcurementDetails(data: any) {
        this.details.next(data);
    }
}
