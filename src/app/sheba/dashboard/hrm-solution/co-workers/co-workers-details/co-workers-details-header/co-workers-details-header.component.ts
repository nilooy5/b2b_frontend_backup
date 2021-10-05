import { Component, Input, OnInit } from '@angular/core';
import { CoWorkersDetailsService } from '../../co-workers-services/co-workers-details.service';
import { PopAlertService } from '../../../../../../modules/pop-alert/pop-alert.service';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-co-workers-details-header',
    templateUrl: './co-workers-details-header.component.html',
    styleUrls: ['./co-workers-details-header.component.scss']
})

export class CoWorkersDetailsHeaderComponent implements OnInit {

    @Input() headerInfo: { image: string; name: string; status: string };
    badgeObj: { label: string, backgroundColor: string, fontWeight: string };
    buttonText: string;
    postingToApi = false;

    constructor(private coWorkersDetailsService: CoWorkersDetailsService,
                private pop: PopAlertService) { }

    ngOnInit() {
        if (this.headerInfo.status) {
            this.initializeBadgeColor(this.headerInfo.status);
        }
    }

    initializeBadgeColor(status: string) {
        switch (status) {
            case 'active':
                this.badgeObj = { label: status, backgroundColor: '#2ba660', fontWeight: '400' };
                this.buttonText = 'Deactivate';
                break;
            case 'inactive':
                this.badgeObj = {label: status, backgroundColor: '#b3b7cc', fontWeight: '400'};
                this.buttonText = 'Activate';
                break;
            case 'invited':
                this.badgeObj = {label: status, backgroundColor: '#ff8219', fontWeight: '400'};
                break;
        }
    }

    print() { }

    deactivate(currentStatus) {
        this.postingToApi = true;
        const data = {
            status: currentStatus === 'Activate' ? 'active' : 'inactive'
        };

        this.coWorkersDetailsService.updateCoWorkerStatus(data).subscribe(
            (res) => {
                this.postingToApi = false;
                if (res.code === 200) {
                    if (currentStatus === 'Activate') {
                        this.pop.open('Profile Activated');
                        this.changeButtonStatus('Deactivate');
                        this.initializeBadgeColor('active');
                    } else {
                        this.pop.open('Profile Deactivated');
                        this.changeButtonStatus('Activate');
                        this.initializeBadgeColor('inactive');
                    }
                    return;
                }
                this.pop.open(res.message);
            },
            (error) => {
                this.postingToApi = false;
                this.pop.open(error.message);
            }
        );
    }

    changeButtonStatus(status) {
        this.buttonText = status;

    }

}
