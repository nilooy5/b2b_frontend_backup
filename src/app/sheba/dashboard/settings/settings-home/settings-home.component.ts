import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../../services/storage.service';

@Component({
    selector: 'app-settings-home',
    templateUrl: './settings-home.component.html',
    styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent implements OnInit {
    canUserAccess = true;

    constructor(
        private storage: StorageService
    ) {
        this.canUserAccess = !!this.storage.user.is_super;
    }

    ngOnInit() {
    }

}
