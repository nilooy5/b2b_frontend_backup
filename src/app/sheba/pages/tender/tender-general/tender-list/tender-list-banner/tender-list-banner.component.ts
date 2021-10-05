import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tender-list-banner',
    templateUrl: './tender-list-banner.component.html',
    styleUrls: ['./tender-list-banner.component.scss']
})
export class TenderListBannerComponent  {

    @Input() tenderList;

    constructor() { }

}
