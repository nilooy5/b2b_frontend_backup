import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../types/users";
import {ProfileService} from "../../../../services/profile.service";
import {StorageService} from "../../../../services/storage.service";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: User;
    account_url=environment.accounts_url;
    constructor(
        private route: ActivatedRoute,
        private service: ProfileService,
        private  storage: StorageService
    ) {
        this.user = this.storage.user;
    }

    ngOnInit() {
    }

}
