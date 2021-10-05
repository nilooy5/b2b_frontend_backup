import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-sheba-bill',
    templateUrl: './sheba-bill.component.html',
    styleUrls: ['./sheba-bill.component.scss']
})
export class ShebaBillComponent implements OnInit {
    @Input() items;

    constructor() { }

    ngOnInit() {
    }
}
