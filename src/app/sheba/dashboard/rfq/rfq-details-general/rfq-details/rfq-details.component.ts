import {Component, OnDestroy} from '@angular/core';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {ActivatedRoute} from '@angular/router';
import {Breadcrumb} from '../../../../../types/general';
import {MatDialog} from '@angular/material';
import {RfqEditGeneralInfoComponent} from './rfq-details-show/rfq-edit-general-info/rfq-edit-general-info.component';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDateTime} from '../../../../../helpers/functions';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-details',
    templateUrl: './rfq-details.component.html',
    styleUrls: ['./rfq-details.component.scss']
})

export class RfqDetailsComponent  {

    constructor() { }

}
