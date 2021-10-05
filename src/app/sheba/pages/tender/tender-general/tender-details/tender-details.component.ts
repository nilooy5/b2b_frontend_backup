import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-tender-details',
    templateUrl: './tender-details.component.html',
    styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit {

    tender;

    constructor(private activatedRoute: ActivatedRoute,
                private http: ShebaHttpService) {
        this.apiResolvedData();
    }

    ngOnInit() {
    }

    apiResolvedData() {
        this.activatedRoute.data.subscribe(({tenderDetails}) => {
            this.tender = tenderDetails.tender;
        });
    }
}
