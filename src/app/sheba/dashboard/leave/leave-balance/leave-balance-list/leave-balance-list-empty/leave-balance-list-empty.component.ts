import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {Router} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-leave-balance-list-empty',
    templateUrl: './leave-balance-list-empty.component.html',
    styleUrls: ['./leave-balance-list-empty.component.scss']
})
export class LeaveBalanceListEmptyComponent implements OnInit {

    constructor(private router: Router,
                private storage: StorageService) {
    }

    ngOnInit() {
    }

    redirectTo() {
        this.router.navigate(['/', 'dashboard', 'settings', 'leave', 'type']).then();
    }

    redirectToHelp() {
        return environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
    }
}
