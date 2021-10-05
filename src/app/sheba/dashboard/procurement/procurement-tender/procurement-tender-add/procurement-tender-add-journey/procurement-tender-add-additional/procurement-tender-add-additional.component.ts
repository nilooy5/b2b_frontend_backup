import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TenderService} from '../../../../../../../services/tender-service/tender.service';

@Component({
    selector: 'app-procurement-tender-add-additional',
    templateUrl: './procurement-tender-add-additional.component.html',
    styleUrls: ['./procurement-tender-add-additional.component.scss']
})
export class ProcurementTenderAddAdditionalComponent implements OnInit {

    storedAdditionalInformation: any;
    description = new FormControl();

    constructor(private tenderService: TenderService) {
       this.storedAdditionalInformation = this.tenderService.AdditionalInformation ? this.tenderService.AdditionalInformation : '';
       this.description.setValue(this.storedAdditionalInformation);
    }


    ngOnInit() {
        this.description.valueChanges.subscribe(res => {
            this.tenderService.AdditionalInformation = res;
        });
    }

}
