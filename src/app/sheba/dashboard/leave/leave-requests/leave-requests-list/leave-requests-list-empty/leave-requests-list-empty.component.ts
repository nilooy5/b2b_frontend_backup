import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-leave-requests-list-empty',
    templateUrl: './leave-requests-list-empty.component.html',
    styleUrls: ['./leave-requests-list-empty.component.scss']
})
export class LeaveRequestsListEmptyComponent implements OnInit {

    constructor(private router: Router,
                private storage: StorageService) {
    }

    ngOnInit() {
    }

    redirectTo() {
        this.router.navigate(['/', 'dashboard', 'settings', 'approval']).then();
    }

    redirectToHelp() {
        return environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
    }
}
