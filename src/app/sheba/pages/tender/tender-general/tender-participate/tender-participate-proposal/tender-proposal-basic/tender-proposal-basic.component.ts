import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../../../../modules/pop-alert/pop-alert.service';
import {TenderVerifyPhoneComponent} from '../../../../../../modals/tender-verify-phone/tender-verify-phone.component';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../../../../../../environments/environment';

@Component({
    selector: 'app-tender-proposal-basic',
    templateUrl: './tender-proposal-basic.component.html',
    styleUrls: ['./tender-proposal-basic.component.scss']
})

export class TenderProposalBasicComponent implements OnInit, OnDestroy {

    attachments;
    notValidForm = true;
    companyPhoneValid = false;

    @Input() tender;

    @Output() proposalFormEmitter = new EventEmitter();

    proposalForm = new FormGroup({
        price: new FormControl(null, Validators.required),
        proposal: new FormControl(null, Validators.required),
        company_name: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        company_phone: new FormControl(null, Validators.required),
        email: new FormControl(),
        status: new FormControl('sent')
    });

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private formBuilder: FormBuilder,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        const footer = document.getElementById('footer');
        footer.style.display = 'none';
    }

    ngOnDestroy() {
        const footer = document.getElementById('footer');
        footer.style.display = 'block';
    }

    receiveAttachments($event) {
        this.attachments = $event;
        this.proposalForm.addControl('attachment', new FormControl(this.attachments));
    }

    emitOnFormChange() {
        this.proposalFormEmitter.emit(this.proposalForm);
    }

    checkFormValidity() {
        return this.notValidForm = !(this.proposalForm && this.proposalForm.status === 'VALID' && this.companyPhoneValid);
    }

    submitForm() {
        const data = this.proposalForm.value;
        const url = 'v2/businesses/tenders/' + this.tender.id + '/proposal';
        this.openOTPModal(data.company_phone, data, url, this.tender.id);
    }

    openOTPModal(phone, proposalData, postUrl, tenderId) {
        const account_url = 'api/v1/accountkit/generate/token?app_id=' + environment.account_kit_app_id;
        this.http.getFromAccountsApi(account_url).toPromise().then(res => {
            if (res.code === 200) {
                const res_token = res.token;
                const data = {
                    type: 'default',
                    title: 'Enter phone number',
                    text: 'We will send you a verification to this number to verify yourself ',
                    actionText: 'CONTINUE',
                    token: res_token,
                    phoneNo: phone,
                    skipToPin: true,
                    tenderData: proposalData,
                    apiEnd: postUrl,
                    tenderID: tenderId
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

    verify_phone(event) {
        const value = event.target.value;
        const company_phone = /^(?:\+?88)?01[013|13|014|14|018|18|016|16|017|17|019|19|015|15]\d{8}$/;
        if (value.match(company_phone)) {
            this.companyPhoneValid = true;
        } else {
            this.companyPhoneValid = false;
        }
    }

    get proposalFormControls() {
        return this.proposalForm.controls;
    }
}
