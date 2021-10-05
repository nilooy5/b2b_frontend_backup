import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class PopAlertService {
    config: MatSnackBarConfig;

    constructor(private service: MatSnackBar) {
        this.config = {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'sheba-pop',
            data: null,
            duration: 3000
        }
    }

    open(message: string, action?: string, config?: MatSnackBarConfig) {
        if (!action) action = 'OK';
        this.config = Object.assign(this.config, config);
        this.service.open(message, action, this.config)
    }

    success() {
    }

    error() {

    }
}
