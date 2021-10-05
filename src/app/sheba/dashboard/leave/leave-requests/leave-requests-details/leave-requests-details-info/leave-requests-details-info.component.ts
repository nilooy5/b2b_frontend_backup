import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';

@Component({
    selector: 'app-leave-requests-details-info',
    templateUrl: './leave-requests-details-info.component.html',
    styleUrls: ['./leave-requests-details-info.component.scss']
})
export class LeaveRequestsDetailsInfoComponent implements OnInit {
    attachmentsOption: NgxGalleryOptions[];
    attachments: NgxGalleryImage[] = [];

    @Input() requestDetails;
    @ViewChild('onlyPreviewGallery') onlyPreviewGallery: NgxGalleryComponent;

    constructor() {
    }

    ngOnInit() {
        if (this.requestDetails.attachments) {
            this.setAttachments(this.requestDetails.attachments);
        }
    }

    setAttachments(attachments) {
        this.attachmentsOption = [
            {
                width: '0px',
                height: '0px',
                image: false,
                thumbnails: false,
                previewZoom: true,
                previewRotate: true,
                thumbnailsMargin: 10,
                thumbnailsColumns: 4
            }
        ];
        attachments.forEach(item => {
            this.attachments.push({
                small: item.file,
                big: item.file
            });
        });
    }

    openPreview() {
        this.onlyPreviewGallery.openPreview(0);
    }

    downloadAttachment(url) {
        window.open(url, '_blank');
    }
}
