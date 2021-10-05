import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-support-details',
    templateUrl: './support-details.component.html',
    styleUrls: ['./support-details.component.scss']
})
export class SupportDetailsComponent implements OnInit {

    supportInfo: any;

    constructor(private route: ActivatedRoute,
                private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) {
        this.route.data.subscribe(res => this.supportInfo = res.supportDetails);
    }

    ngOnInit() { }

    closeSupport() {
        this.http.post('v2/members/' + this.storage.user.member_id + '/supports/' + this.supportInfo.id + '/resolve', 1).toPromise().then(res => {
            if (res.code === 200) {
                window.location.reload();
            } else {
                this.pop.open(res.message);
            }
        });
    }

}
