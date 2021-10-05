import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tender-details-apply',
    templateUrl: './tender-details-apply.component.html',
    styleUrls: ['./tender-details-apply.component.scss']
})
export class TenderDetailsApplyComponent implements OnInit {

    @Input() tender;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    applyToTender() { 
        this.router.navigate(['tender', this.tender.id, 'participate']);
    }

}
