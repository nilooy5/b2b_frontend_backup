import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionValidationService {

    private notify = new Subject<any>();
    notifySubscriptionSubmit = this.notify.asObservable();

    constructor() { }

    public notifySubsSubmit(data) {
        if (data) {
            this.notify.next(data);
        }
    }

}
