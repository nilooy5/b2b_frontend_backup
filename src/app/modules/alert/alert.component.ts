import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements AfterViewInit {
    className: string;
    message: any;
    @ViewChild('alert') alert: ElementRef;

    constructor() {
    }

    ngAfterViewInit() {

    }

    getView(){

    }
}
