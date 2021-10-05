import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-select-picker-item',
    templateUrl: './select-picker-item.component.html',
    styleUrls: ['./select-picker-item.component.scss']
})
export class SelectPickerItemComponent implements OnInit {
    @Input() item;
    @Input() bindTitle = 'title';
    @Input() bindSubtitle = 'sub_title';
    @Input() bindImage = 'image';
    subtitles: string[];
    active: boolean;

    constructor() {
    }

    get selectedItem() {
        return this.item;
    }

    getLabel() {
        return this.item[this.bindTitle]
    }

    ngOnInit() {
        this.subtitles = this.bindSubtitle.split(',');
    }

    setActiveStyles() {
        this.active = true;
    }

    setInactiveStyles() {
        this.active = false;
    }
}
