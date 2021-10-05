import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoWorkersSharedService} from '../../co-workers-services/co-workers-shared.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-co-workers-confirmation-message',
    templateUrl: './co-workers-confirmation-message.component.html',
    styleUrls: ['./co-workers-confirmation-message.component.scss']
})
export class CoWorkersConfirmationMessageComponent implements OnInit, OnDestroy {

    showMessageContainer = false;
    isSuccessful: boolean;
    message: string;
    confirmationSub$: Subscription;

    constructor(private coWorkersSharedService: CoWorkersSharedService) { }

    ngOnInit() {
        this.confirmationSub$ = this.coWorkersSharedService.currentConfirmationStatus.subscribe(res => {
            this.showMessageContainer = res.showContainer;
            this.isSuccessful = res.isSuccessful;
            this.message = res.message;
        });

    }

    closeMessageContainer() {
        this.showMessageContainer = false;
    }

    ngOnDestroy() {
        this.confirmationSub$.unsubscribe();
    }
}
