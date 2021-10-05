import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-landing-how-works',
  templateUrl: './landing-how-works.component.html',
  styleUrls: ['./landing-how-works.component.scss']
})
export class LandingHowWorksComponent implements OnInit {
  isMobileDevice: boolean;
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

}
