import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../types/users';
import {StorageService} from '../../services/storage.service';
import {NavLink} from '../../types/general';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-general-root',
    templateUrl: './general-root.component.html',
    styleUrls: ['./general-root.component.scss']
})
export class GeneralRootComponent implements OnInit, OnDestroy {

    user: User;
    navLinks: NavLink[] = [];
    subscription: Subscription;

    constructor(
        private storage: StorageService
    ) { }

    ngOnInit() {
        this.subscription = this.storage.loggedIn$.subscribe(res => {
            if (res.user && (typeof res.user !== 'undefined' && typeof res.user !== 'string')) {
                this.user = this.storage.user;
                this.navLinks = [
                    {
                        label: 'Portal',
                        path: '/dashboard/rfq/create',
                        isButton: true
                    }
                ];
            } else {
                this.navLinks = [
                    {
                        label: 'Contacts',
                        path: '/contact-us',
                    },
                    {
                        label: 'Stories',
                        path: 'https://www.sheba.xyz/blog/bn/category/%e0%a6%8f%e0%a6%b8-%e0%a6%ac%e0%a6%bf%e0%a6%9c%e0%a6%a8%e0%a7%87%e0%a6%b8/',
                    },
                    {
                        label: 'Log in',
                        path: '/auth/login',
                    },
                    {
                        label: 'Free Trial',
                        path: '/auth/sign-up',
                        queryParams: {reference: 'Start_REG_Menu'},
                        isButton: true,
                    }
                ];
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
