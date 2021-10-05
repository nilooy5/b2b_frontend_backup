import { Component, OnDestroy } from '@angular/core';
import { RfqInviteStorageService } from '../../../../services/rfq-invite-storage-service/rfq-invite-storage.service';

@Component({
    selector: 'app-rfq-invite-general',
    templateUrl: './rfq-invite-general.component.html',
    styleUrls: ['./rfq-invite-general.component.scss']
})

export class RfqInviteGeneralComponent implements OnDestroy {

    constructor(private rfqInviteStorageService: RfqInviteStorageService) { }

    ngOnDestroy() {
        this.rfqInviteStorageService.removeRfqFromStorage();
    }

}
