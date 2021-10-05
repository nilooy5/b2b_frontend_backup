import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {SimpleConfirmationComponent} from "./simple-confirmation/simple-confirmation.component";

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {

    constructor(
        private dialog: MatDialog
    ) {

    }

    open(config?: ConfirmationConfig) {
        const component = (config && config.type === 'simple') ? SimpleConfirmationComponent : SimpleConfirmationComponent;
        const maxWidth = (config && config.maxWidth) ? config.maxWidth : '400px';
        return this.dialog.open(component, {
            data: config,
            maxWidth: maxWidth
        })
    }
}

export interface ConfirmationConfig {
    type?: 'simple' | null;
    title?: string;
    sub_title?: string;
    okButtonText?: string;
    cancelButtonText?: string;
    maxWidth?: string;
}
