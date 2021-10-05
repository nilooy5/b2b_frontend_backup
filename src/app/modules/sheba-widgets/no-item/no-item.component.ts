import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from "../../../services/global.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-no-item',
    templateUrl: './no-item.component.html',
    styleUrls: ['./no-item.component.scss']
})
export class NoItemComponent implements OnInit {
    @Input()
    heading = 'No Items Found';
    @Input() action: boolean = false;
    @Input() action_text: string = 'Go Back';
    @Input() showAction: boolean = true;
    @Output()
    OnActionTaken = new EventEmitter<any>();

    constructor(private globalService: GlobalService, private router: Router) {
    }

    ngOnInit() {
    }

    takeAction() {
        if (!this.action) {
            this.OnActionTaken.emit(true);
            this.globalService.goBack();
        } else if (this.action) {
            this.OnActionTaken.emit(true);
        }
    }

}
