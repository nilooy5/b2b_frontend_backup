import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {PopAlertService} from 'src/app/modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from 'src/app/modules/sheba-http/sheba-http.service';
import {Router} from '@angular/router';
import {TenderOtpPinComponent} from 'src/app/sheba/modals/tender-otp-pin/tender-otp-pin.component';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../../../../../environments/environment';

@Component({
    selector: 'app-tender-proposal-verification',
    templateUrl: './tender-proposal-verification.component.html',
    styleUrls: ['./tender-proposal-verification.component.scss']
})

export class TenderProposalVerificationComponent implements OnInit {
    timeLeft: number;
    retry_after: number;
    minutes: number;
    seconds: number;
    time_format: string;
    interval;
    timer_show = false;
    can_submit = false;
    is_continue = false;
    show_error = false;
    phone_number: string;
    show_phone_input_modal = false;
    show_otp_pin_modal = true;
    otp_pin: string = null;
    pin_values: any = {
        first: null,
        second: null,
        third: null,
        fourth: null
    };

    constructor(public dialogRef: MatDialogRef<TenderProposalVerificationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    type: string,
                    title: string,
                    text: string,
                    actionText: string,
                    token: string,
                    phoneNo?: number,
                    skipToPin?: boolean,
                    actionName: string,
                    tenderID: number,
                    bidId: number
                },
                private dialog: MatDialog,
                private pop: PopAlertService,
                private http: ShebaHttpService,
                private router: Router) {

        dialogRef.disableClose = true;
        console.log(this.data);

        if (this.data.skipToPin) {
            this.phone_number = String(this.data.phoneNo);
            this.continue();
        }
    }

    ngOnInit(): void {
        //  throw new Error("Method not implemented.");
    }

    continue() {
        console.log(this.phone_number);
        const api_data = {
            mobile: this.phone_number,
            app_id: environment.account_kit_app_id,
            api_token: this.data.token
        };
        const api_url = 'api/shoot-otp';
        this.http.postToAccountKit(api_url, api_data).toPromise().then(res => {
            if (res.message === 'Good.') {
                this.show_phone_input_modal = false;
                this.show_otp_pin_modal = true;
                this.retry_after = res.can_retry_after;
                this.timeLeft = this.retry_after;
                this.timer_show = true;
                this.startTimer();
            } else {
                this.show_error = true;
                window.setTimeout(() => {
                    this.show_error = false;
                }, 4000);
            }
        });
        // this.otpPinModal();
    }

    separateTime(time) {
        if (time > 60) {
            this.minutes = Math.floor(time / 60);
            this.seconds = time % 60;
            const format_minutes = this.minutes > 9 ? this.minutes : '0' + this.minutes;
            const format_seconds = this.seconds > 9 ? this.seconds : '0' + this.seconds;
            this.time_format = '00 : ' + format_minutes + ' : ' + format_seconds;
        } else {
            this.seconds = time;
            const format_seconds = this.seconds > 9 ? this.seconds : '0' + this.seconds;
            this.time_format = '00 : 00 : ' + format_seconds;
        }
    }

    submit() {
        const pin_data = {
            otp: this.otp_pin,
            mobile: this.phone_number,
            app_id: environment.account_kit_app_id,
            api_token: this.data.token
        };
        const api_otp_url = 'api/validate-otp';

        this.http.postToAccountKit(api_otp_url, pin_data).toPromise().then(res => {
            if (res.authorization_code) {
                const apiUrl = 'v1/continue-with-kit';
                const headerDict = {
                    'portal-name': 'business-portal'
                };
                const data = {
                    from: 'manager-app',
                    code: res.authorization_code
                };
                window.setTimeout(() => {
                    this.dialogRef.close();

                    this.http.postToAccountKitWithHeader(apiUrl, data, {
                        responseType: 'json',
                        headers: new HttpHeaders(headerDict)
                    }).toPromise().then(response => {
                        if (response.code === 200) {
                            const apiActionUrl = 'v2/partners/' + response.info.partner.id + '/bids/' + this.data.bidId;
                            const actionData = {
                                status: this.data.actionName,
                                remember_token: response.info.token
                            };
                            this.http.post(apiActionUrl, actionData).toPromise().then(res => {
                                if (res.code === 200) {
                                    this.router.navigate(['/', 'tender', this.data.tenderID, 'hire', this.data.bidId, this.data.actionName]).catch(err => {
                                        console.log(err);
                                    });
                                    window.open(res.work_order, '_blank');
                                } else {
                                    this.router.navigate(['/', 'tender', this.data.tenderID, 'hire', this.data.bidId, 'failed']).catch(err => {
                                        console.log(err);
                                    });
                                }

                            });
                        } else if (response.code === 420) {
                            // console.log(response.reason);
                            // this.dialogRef.close();
                            // if (response.reason === 'invite_only') {
                            //     this.router.navigate(['/', 'tender', this.data.tenderID, 'participate', 'invited-only']).catch(err => {
                            //         console.log(err);
                            //     });
                            // } else if (response.reason === 'verification') {
                            //     this.router.navigate(['/', 'tender', this.data.tenderID, 'participate', 'verified-only']).catch(err => {
                            //         console.log(err);
                            //     });
                            // }
                        }
                    }).catch(err => this.pop.open(err.message));
                }, 2000);
            }
        }).catch(err => this.errorMethod(err));
    }

    errorMethod(err) {
        this.show_error = true;
        window.setTimeout(() => {
            this.show_error = false;
        }, 4000);
    }

    backToPhoneInput() {
        this.show_phone_input_modal = true;
        this.show_otp_pin_modal = false;
        this.pin_values = {
            first: null,
            second: null,
            third: null,
            fourth: null
        };
        this.can_submit = false;
    }

    otpPinModal(modalType, modalErrorType) {
        const data = {
            type: modalType,
            errorType: modalErrorType
        };

        this.dialog.open(TenderOtpPinComponent, {
            data,
            width: '570px',
            height: '450px',
            panelClass: 'dialog-confirmation'
        });
    }

    verify_phone(event) {
        const value = event.target.value;
        const phoneno = /^(?:\+?88)?01[013|13|014|14|018|18|016|16|017|17|019|19|015|15]\d{8}$/;
        if (value.match(phoneno)) {
            this.is_continue = true;
        } else {
            this.is_continue = false;
        }
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    getPin(event, pin_position) {
        const value = event.target.value;
        if (pin_position === 1) {
            this.pin_values.first = this.checkIfDigit(value) ? value : null;
            if (this.pin_values.first) {
                document.getElementById('pin_second').focus();
            }
        } else if (pin_position === 2) {
            this.pin_values.second = this.checkIfDigit(value) ? value : null;
            if (this.pin_values.second) {
                document.getElementById('pin_third').focus();
            }
        } else if (pin_position === 3) {
            this.pin_values.third = this.checkIfDigit(value) ? value : null;
            if (this.pin_values.third) {
                document.getElementById('pin_fourth').focus();
            }
        } else if (pin_position === 4) {
            this.pin_values.fourth = this.checkIfDigit(value) ? value : null;
        }
        if (this.pin_values.first && this.pin_values.second && this.pin_values.third && this.pin_values.fourth) {
            this.otp_pin = this.pin_values.first + this.pin_values.second + this.pin_values.third + this.pin_values.fourth;
            this.can_submit = true;
        } else {
            this.can_submit = false;
            this.otp_pin = null;
        }

        // console.log(this.pin_values, this.otp_pin);
    }

    checkIfDigit(value) {
        return value.match(/^[0-9]+$/) ? true : false;
    }

    resendOtp() {
        const api_data = {
            mobile: this.phone_number,
            app_id: environment.account_kit_app_id,
            api_token: this.data.token
        };
        const api_url = 'api/shoot-otp';
        this.http.postToAccountKit(api_url, api_data).toPromise().then(res => {
            if (res.message === 'Good.') {
                this.timeLeft = this.retry_after;
                this.timer_show = true;
                this.startTimer();
            } else {
                this.show_error = true;
                window.setTimeout(() => {
                    this.show_error = false;
                }, 4000);
            }
        });
    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft >= 0) {
                this.separateTime(this.timeLeft);
                this.timeLeft--;
            } else {
                clearInterval(this.interval);
                this.timer_show = false;
                this.time_format = null;
            }
        }, 1000);
    }
}
