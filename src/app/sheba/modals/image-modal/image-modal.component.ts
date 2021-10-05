import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';

@Component({
    selector: 'app-image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.scss']
})

export class ImageModalComponent {

    @ViewChild('template') template: any;

    modalRef: BsModalRef;
    config: ModalOptions = {
        class: 'modal-dialog-centered custom-image-modal',
        backdrop: true,
        ignoreBackdropClick: true
    };

    constructor(private modalService: BsModalService) {
        setTimeout(() => {
            this.modalRef = this.modalService.show(this.template, this.config)
        }, 1000);
    }

    closeModal() {
        this.modalRef.hide();
    }
}
