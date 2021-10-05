import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-digigo-main-features',
    templateUrl: './digigo-main-features.component.html',
    styleUrls: ['./digigo-main-features.component.scss']
})
export class DigigoMainFeaturesComponent implements OnInit {
    listStyles = {
        green: '../../../../../../assets/svg/icons/digigo-landing/main-features/list-styles/green.svg',
        blue: '../../../../../../assets/svg/icons/digigo-landing/main-features/list-styles/blue.svg',
        yellow: '../../../../../../assets/svg/icons/digigo-landing/main-features/list-styles/yellow.svg',
        red: '../../../../../../assets/svg/icons/digigo-landing/main-features/list-styles/red.svg'
    };

    constructor() {
    }

    ngOnInit() {
    }

}
