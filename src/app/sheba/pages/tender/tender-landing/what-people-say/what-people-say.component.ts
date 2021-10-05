import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-what-people-say',
  templateUrl: './what-people-say.component.html',
  styleUrls: ['./what-people-say.component.scss']
})
export class WhatPeopleSayComponent implements OnInit {
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
