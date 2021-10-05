import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {ProfileService} from "../../../services/profile.service";
import {User} from "../../../types/users";
import {appConfig, AppConfig} from "../../../config/app.config";

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
    user: User;
    appConfig: AppConfig = appConfig;

    constructor(
        private route: ActivatedRoute,
        private storage: StorageService,
        private service: ProfileService
    ) {
        this.route.data.subscribe(res => {
            this.service.setProfileToStorage(res);
            this.user = this.storage.user;
        });
    }

    ngOnInit() {
    }

}
