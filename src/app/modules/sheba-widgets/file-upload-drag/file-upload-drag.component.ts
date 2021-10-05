import {Component, Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {  FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import {PopAlertService} from '../../pop-alert/pop-alert.service';

@Component({
    selector: 'app-file-upload-drag',
    templateUrl: './file-upload-drag.component.html',
    styleUrls: ['./file-upload-drag.component.scss']
})

export class FileUploadDragComponent implements OnInit {
    @Input() url: any;
    @Input() noUpload = false;
    @Input() type: any;
    @Input() type_id: any;
    @Output() uploaded: EventEmitter<any> = new EventEmitter();
    @Output() selected: EventEmitter<any> = new EventEmitter();
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    constructor(
        private pop: PopAlertService,
    ) {

    }

    ngOnInit() {

        this.uploader = new FileUploader({url: this.url, itemAlias: 'file', additionalParameter: {type: this.type, type_id: this.type_id}});
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            this.emitFiles();
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status === 200) {
                this.pop.open('File uploaded.');
                this.uploaded.emit();
                this.uploader = new FileUploader({url: this.url, itemAlias: 'file', additionalParameter: {type: this.type, type_id: this.type_id}});
            } else { this.pop.open('File upload Failed.'); }
        };
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    updateQueue() {
        this.emitFiles();
    }

    emitFiles() {
        this.selected.emit(this.uploader.queue);
    }

}
