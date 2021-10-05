import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';

@Component({
  selector: 'app-mobile-view-modal',
  templateUrl: './mobile-view-modal.component.html',
  styleUrls: ['./mobile-view-modal.component.scss']
})

export class MobileViewModalComponent {

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
