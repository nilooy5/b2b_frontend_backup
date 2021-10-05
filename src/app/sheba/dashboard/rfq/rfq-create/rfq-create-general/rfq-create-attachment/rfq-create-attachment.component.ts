import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormControl } from '@angular/forms';
import { RfqStorageService } from '../../../../../../services/rfq-storage-service/rfq-storage.service';
import { RfqCreateSharedService } from '../../../rfq-services/rfq-create-services/rfq-create-shared.service';

@Component({
    selector: 'app-rfq-create-attachment',
    templateUrl: './rfq-create-attachment.component.html',
    styleUrls: ['./rfq-create-attachment.component.scss']
})

export class RfqCreateAttachmentComponent implements OnInit {


    @Output() showScoreBoard = new EventEmitter();


    public uploader: FileUploader;

    isAttachmentValid;
    isAttachmentTouched = true;
    encodedFiles = [];

    attachments = new FormControl(['']);

    constructor(private rfqStorageService: RfqStorageService,
                private rfqCreateSharedService: RfqCreateSharedService) {

        this.isAttachmentValid = this.rfqStorageService.RfqValidation.hasAttachment;

        if (this.rfqStorageService.Attachments) {
            this.rfqStorageService.Attachments.forEach((item) => {
                this.encodedFiles.push(item);
            });
        }
    }

    ngOnInit() {
        this.watchAttachmentsChanges();
        this.uploader = new FileUploader({itemAlias: 'Document'});
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
    }

    watchAttachmentsChanges() {
        this.attachments.valueChanges.subscribe((attachments) => {
            if (attachments) {
                this.rfqStorageService.RfqValidation = { hasAttachment: true };
                this.checkAttachmentValidation('attachment', attachments);
                this.storeAttachmentsIntoLocalStorage(attachments);
            }
            if (!attachments.length) {
                this.rfqStorageService.RfqValidation = { hasAttachment: false };

            }
        });
    }


    onFileDrop(event) {
        Array.from(event).forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item as Blob);
            reader.onload = (e: any) => {
                // @ts-ignore
                this.encodedFiles.push({file: e.target.result, name: item.name});
                this.attachments.setValue(this.encodedFiles);
            };
        });
    }

    onFileSelect(event) {
        Array.from(event.target.files).forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item as Blob);
            reader.onload = (e: any) => {
                // @ts-ignore
                this.encodedFiles.push({file: e.target.result, name: item.name});
                this.attachments.setValue(this.encodedFiles);
            };
        });
    }

    removeSelectedFile(item) {
        const index = this.encodedFiles.indexOf(item);
        this.encodedFiles.splice(index, 1);
        this.attachments.setValue(this.encodedFiles);
    }

    limitString(str) {
        return (str && str.length > 30) ? str.slice(0, 30) + '..' : str;
    }

    checkAttachmentValidation(name, value) {
        if (value && this.isAttachmentTouched === true) {
            this.showScoreBoard.emit();
        }
        if (value.length === 1 && this.isAttachmentValid === false) {
            this.isAttachmentTouched = false;
            this.isAttachmentValid = true;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: this.isAttachmentValid });
        }
        if (value.length < 1 && this.isAttachmentValid === true) {
            this.isAttachmentValid = false;
            this.rfqCreateSharedService.changeBasicInfoValidationStatus({ name, isValid: this.isAttachmentValid });
        }
    }

    storeAttachmentsIntoLocalStorage(attachments) {
        this.rfqStorageService.Attachments = attachments;
    }

    clearFileInput(event: MouseEvent) {
        // Clearing Input so that same file can be selected twice
        const element = event.target as HTMLInputElement;
        element.value = '';
    }
}
