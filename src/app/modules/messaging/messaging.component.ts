import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Comment} from '../../types/fleet';
import {appConfig} from '../../config/app.config';
import {FormControl, Validators} from '@angular/forms';
import {StorageService} from '../../services/storage.service';
import {ShebaHttpService} from '../sheba-http/sheba-http.service';
import {PopAlertService} from '../pop-alert/pop-alert.service';

@Component({
    selector: 'app-messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class MessagingComponent implements OnInit {


    uploadedAttachment = null;
    isLoading = false;
    isDisabled = false;
    @Input() messages: any[] = [];
    @Input() postUrl: string;
    @Input() postAttachmentUrl: string;
    baseUrl: any;
    @Output() OnMessageUpdate: EventEmitter<boolean> = new EventEmitter();
    sentMessage = new FormControl('', Validators.required);
    appConfig = appConfig;

    constructor(
        private storage: StorageService,
        private pop: PopAlertService,
        private http: ShebaHttpService) { }

    ngOnInit() {
        this.baseUrl = 'v2/businesses/' + this.storage.user.business_id + '/';
    }

    sendMessage() {
        if (this.sentMessage.valid) {
            const comment = {
                comment: this.sentMessage.value
            };
            this.isLoading = true;
            this.isDisabled = true;
            this.http.post(this.baseUrl + this.postUrl, comment).toPromise().then(res => {
                if (res.code === 200) {
                    if (this.uploadedAttachment) {
                        this.sendAttachments();
                        this.OnMessageUpdate.emit(true);
                        this.sentMessage.reset();
                    } else {
                        this.OnMessageUpdate.emit(true);
                        this.isLoading = false;
                        this.isDisabled = false;
                        this.sentMessage.reset();}

                } else {
                    this.pop.open(res.message);
                }
            });
        } else {
            console.error('Its not valid');
        }
    }

    sendAttachments() {
        const formData: FormData = new FormData();
        formData.append('file', this.uploadedAttachment);
        this.isLoading = true;
        this.isDisabled = true;
        this.http.post(this.baseUrl + this.postAttachmentUrl, formData).toPromise().then(res => {
            if (res.code === 200) {
                this.isLoading = false;
                this.isDisabled = false;
                this.uploadedAttachment = null;
            } else {
                console.log(res.message);
            }
        });
    }

    storeMessageAttachment() {
        if (this.sentMessage.value && this.uploadedAttachment) {
            this.sendMessage();
        } else if (this.sentMessage.value) {
            this.sendMessage();
        } else if (this.uploadedAttachment) {
            this.sendAttachments();
        } else {
            this.pop.open('Please Type Something');
        }
    }

    onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            return;
        }
        this.uploadedAttachment = files[0];
    }

    clearAttachment() {
        this.uploadedAttachment = null;
    }

    limitString(str) {
        return (str && str.length > 80) ? str.slice(0, 60) + '..' : str;
    }

}
