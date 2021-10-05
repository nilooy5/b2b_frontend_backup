import {Component, OnInit} from '@angular/core';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {MatDialog} from '@angular/material';
import {TenderVerifyPhoneComponent} from '../../../modals/tender-verify-phone/tender-verify-phone.component';
import {TenderLandingService} from '../tender-services/tender-landing/tender-landing.service';
import {ResponsiveService} from '../tender-services/tender-landing/responsive.service';
import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-tender-landing',
    templateUrl: './tender-landing.component.html',
    styleUrls: ['./tender-landing.component.scss']
})

export class TenderLandingComponent implements OnInit {
    categories: any = [];
    statistics: any;
    tenders: any = [];
    isBottomSlide = false;
    isMobileDevice: number;

    constructor(private http: ShebaHttpService,
                private tenderLandingService: TenderLandingService,
                private responsiveService: ResponsiveService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getLandingInfo();
        window.addEventListener('scroll', this.scroll, true);
        this.responsiveService.getMobileStatus().subscribe(isMobile => {
            if (isMobile) {
                this.isMobileDevice = 1;
            } else {
                this.isMobileDevice = 0;
            }
        });
        this.onResize(0);

    }

    // tslint:disable-next-line: use-life-cycle-interface
    ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

    getLandingInfo() {
        this.activatedRoute.data.subscribe(({tenderLandingInfo}) => {
            this.categories = tenderLandingInfo.data.categories;
            this.statistics = tenderLandingInfo.data.statistics;
            this.tenders = tenderLandingInfo.data.tenders;
            this.tenders.forEach(element => {
                element.colorCode = '10px solid ' + this.getRandomColor();
            });
        });
    }

    testModal() {
        const account_url = 'api/v1/accountkit/generate/token?app_id=' + environment.account_kit_app_id;
        this.http.getFromAccountsApi(account_url).toPromise().then(res => {
            if (res.code === 200) {
                const res_token = res.token;
                const data = {
                    type: 'default',
                    title: 'Enter phone number',
                    text: 'We will send you a verification to this number to verify yourself ',
                    actionText: 'CONTINUE',
                    token: res_token
                };

                this.dialog.open(TenderVerifyPhoneComponent, {
                    data,
                    width: '570px',
                    height: '450px',
                    panelClass: 'dialog-confirmation'
                });
            } else {
                console.log('error');
            }
        });
    }

    scroll = (event: any): void => {
        // tslint:disable-next-line: variable-name
        const number = event.srcElement.scrollingElement.scrollTop;
        if (number > 1100) {
            this.isBottomSlide = true;
        } else {
            this.isBottomSlide = false;
        }
    };

    getRandomColor() {
        const colors = ['#12b886', '#ff8f5e', '#38c8e7'];
        return colors[Math.floor(Math.random() * Math.floor(3))];
    }

    onResize(event: any) {
        this.responsiveService.checkWidth();
    }
}

