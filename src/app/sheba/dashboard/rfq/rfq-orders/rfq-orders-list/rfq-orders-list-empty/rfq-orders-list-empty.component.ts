import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-orders-list-empty',
    templateUrl: './rfq-orders-list-empty.component.html',
    styleUrls: ['./rfq-orders-list-empty.component.scss']
})
export class RfqOrdersListEmptyComponent implements OnInit {

    constructor(private storage: StorageService) {
    }

    ngOnInit() {
    }

    redirectToHelp() {
        const url = environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
        window.open(url, '_blank');
    }

}
