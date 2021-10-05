import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class QuickPurchaseValidationService {

    private notify = new Subject<any>();
    notifySelectedServiceSubmit = this.notify.asObservable();

    constructor() { }

    public notifyServiceSubmit(data) {
        if (data) {
            this.notify.next(data);
        }
    }

}
