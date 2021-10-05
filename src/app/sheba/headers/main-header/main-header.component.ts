import {Component, Input, OnInit} from '@angular/core';
import {NavLink} from '../../../types/general';
import {User} from '../../../types/users';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {IBadge} from '../../../modules/badge/i-badge';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss']
})

export class MainHeaderComponent implements OnInit {
    @Input() title = 'Sheba.xyz';
    @Input() navLinks: NavLink[] = [];
    @Input() user: User;

    currentRoute: string;

    noticeBadge: IBadge;

    showPhoneNavMenu = false;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {

        this.noticeBadge = {
            label: 'Covid-19 Note',
            fontSize: '14px',
            color: '#fff',
            borderRadius: '15px',
            fontWeight: '500',
            padding: '8px 12px',
            textTransform: 'uppercase',
            backgroundColor: '#ff8f5e'
        };

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.currentRoute = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentRoute =  this.currentRoute.split('?')[0];
                this.currentRoute = this.currentRoute === '' ? 'home' : this.currentRoute;
            }
        });
    }

    ngOnInit() {

    }

    redirectToFeatureLanding(featureType: string) {
        if (featureType === 'facility') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'facility', reference: 'View_details_Facility'}}).then();
        }

        if (featureType === 'fleet') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'fleet', reference: 'View_Details_Fleet'}}).then();
        }

        if (featureType === 'rfq') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'procurement', reference: 'View_details_RFQ'}}).then();
        }

        if (featureType === 'topup') {
            this.router.navigate(['/', 'features'], {queryParams: {feature: 'topup', reference: 'View_Details_Topup'}}).then();
        }
    }

    checkCurrentRoute(currentRoute: string) {
        return currentRoute === 'list'
            || currentRoute === 'home'
            || currentRoute === 'sign-up'
            || currentRoute === 'contact-us'
            || currentRoute === 'login'
            || currentRoute === 'features';
    }
}
