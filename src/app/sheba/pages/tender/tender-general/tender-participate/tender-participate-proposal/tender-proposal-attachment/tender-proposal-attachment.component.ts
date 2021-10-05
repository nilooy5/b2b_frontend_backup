import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-tender-proposal-attachment',
    templateUrl: './tender-proposal-attachment.component.html',
    styleUrls: ['./tender-proposal-attachment.component.scss']
})

export class TenderProposalAttachmentComponent implements OnInit {

    public uploader: FileUploader;

    isAttachmentValid;
    encodedFiles = [];
    @Output() attachmentEvent = new EventEmitter();

    attachments = new FormControl(['']);

    constructor() {
    }

    ngOnInit() {
    }

    onFileDrop(event) {
        Array.from(event).forEach((item) => {
            const reader = new FileReader();
            reader.readAsDataURL(item as Blob);
            reader.onload = (e: any) => {
                // @ts-ignore
                this.encodedFiles.push({file: e.target.result, name: item.name});
                this.attachments.setValue(this.encodedFiles);
                this.attachmentEvent.emit(this.encodedFiles);
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
                this.attachmentEvent.emit(this.encodedFiles);
            };
        });
    }

    removeSelectedFile(item) {
        const index = this.encodedFiles.indexOf(item);
        this.encodedFiles.splice(index, 1);
        this.attachments.setValue(this.encodedFiles);
        this.attachmentEvent.emit(this.encodedFiles);
    }

    clearFileInput(event: MouseEvent) {
        // Clearing Input so that same file can be selected twice
        const element = event.target as HTMLInputElement;
        element.value = '';
    }

    limitString(str) {
        return (str && str.length > 30) ? str.slice(0, 30) + '..' : str;
    }

}
