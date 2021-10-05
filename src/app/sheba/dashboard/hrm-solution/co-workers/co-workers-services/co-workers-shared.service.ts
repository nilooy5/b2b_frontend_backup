import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CoWorkersSharedService {


    private confirmationStatusSource = new Subject<{showContainer: boolean, isSuccessful: boolean, message?: string}>();
    currentConfirmationStatus = this.confirmationStatusSource.asObservable();

    private updateCoworkerProfileCompletionScoreSource = new Subject<any>();
    currentUpdateCoworkerProfileCompletionScore = this.updateCoworkerProfileCompletionScoreSource.asObservable();

    constructor() { }

    changeCurrentConfirmationStatus(showContainer: boolean, isSuccessful?: boolean, message?: string) {
        this.confirmationStatusSource.next({ showContainer, isSuccessful, message });
    }

    updateCoworkerProfileCompletionScore(addOrRemoveScore: string) {
        this.updateCoworkerProfileCompletionScoreSource.next(addOrRemoveScore);
    }


}
