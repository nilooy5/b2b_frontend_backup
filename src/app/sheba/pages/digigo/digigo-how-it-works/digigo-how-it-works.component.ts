import {Component, OnInit} from '@angular/core';
import Lity from 'lity';

@Component({
    selector: 'app-digigo-how-it-works',
    templateUrl: './digigo-how-it-works.component.html',
    styleUrls: ['./digigo-how-it-works.component.scss']
})
export class DigigoHowItWorksComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    playVideo() {
        Lity('https://www.youtube.com/watch?v=UeJerMmgIzU');
    }
}
