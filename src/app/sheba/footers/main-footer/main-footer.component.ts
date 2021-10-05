import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormControl} from '@angular/forms';
import {PopAlertService} from '../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-main-footer',
    templateUrl: './main-footer.component.html',
    styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

    socialLinks = {
        facebook: 'https://www.facebook.com/sBusiness.xyz',
        linkedIn: 'https://www.linkedin.com/company/sbusiness-bd/',
        instagram: 'https://www.instagram.com/sbusiness.xyz/'
    };
    email = new FormControl('');
    public env;

    constructor(
        private fb: FormBuilder,
        private pop: PopAlertService,
        private http: ShebaHttpService
    ) {
        this.env = environment;
    }

    ngOnInit() {

    }

    onClick() {
        if (this.email.valid) {
            console.log(this.email.value);

            const data = {
                email: this.email.value,
                portal_name: 'business-portal'
            };

            this.http.post('v2/newsletter', data).toPromise().then((res) => {
                if (res.code === 200) {
                    this.email.reset();
                } else {
                    this.pop.open(res.message);
                }
            });
        }
    }

    gotoLink(url) {
        window.open(url, '_blank');
    }
}
