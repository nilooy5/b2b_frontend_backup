import { Component, OnInit, Input } from '@angular/core';
import Lity from 'lity';
@Component({
  selector: 'app-tender-landing-cover',
  templateUrl: './tender-landing-cover.component.html',
  styleUrls: ['./tender-landing-cover.component.scss']
})
export class TenderLandingCoverComponent implements OnInit {
  isMobileDevice: number;
  @Input()
  set deviceResolution(data: any) {
    this.isMobileDevice = data;
  }
  get deviceResolution() {
    return this.isMobileDevice;
  }
  constructor() { }

  ngOnInit() {
  }

  playVideo() {
    Lity('https://www.youtube.com/watch?v=t8ewhjC8PyE&autoplay=0');
  }
}
