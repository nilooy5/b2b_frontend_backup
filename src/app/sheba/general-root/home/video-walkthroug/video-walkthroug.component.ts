import { Component, OnInit } from '@angular/core';
import Lity from 'lity';


@Component({
    selector: 'app-video-walkthroug',
    templateUrl: './video-walkthroug.component.html',
    styleUrls: ['./video-walkthroug.component.scss']
})
export class VideoWalkthrougComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }


    playVideo() {
        Lity('https://www.youtube.com/watch?v=Z9DvdX0N-DI&autoplay=0');
    }
}
