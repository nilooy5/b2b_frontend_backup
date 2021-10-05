import { Injectable } from '@angular/core';
import {forkJoin, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StepperService {

    private stepperIndexSource = new Subject<any>();
    currentStepperIndex = this.stepperIndexSource.asObservable();

    private stepBackSource = new Subject<any>();
    currentStepBack = this.stepBackSource.asObservable();

    private modalStatusSource = new Subject<any>();
    modalStatus = this.modalStatusSource.asObservable();

    constructor() { }

    changeStepperIndex(index: number) {
        this.stepperIndexSource.next(index);
    }

    stepperBack(index) {
        this.stepBackSource.next(index);
    }

    changeModalStatus(message: any) {
        this.modalStatusSource.next(message);
    }


}
